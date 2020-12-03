const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const db = require('./queries')
const isnumber = require('is-number')
const cors = require('cors');

const corsOptions = {

}

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const router = express.Router()

router.use(function(req, res, next) {
    console.log('API is doing something')
    next()
});


router.get('/', (req, res) => {
    res.json({info: 'This is the API'})
})


router.route('/scenarios')

    .get(function(req, res){
        studentID = req.get('studentid')
        if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid student ID")
            res.end()
        }
        else{
            db.getScenarios(studentID, function(result){
                if(result.length == 0){
                    res.status(404).json({error: `No scenarios found for studentid: ${studentID}`})
                }
                else{
                res.status(200).json(result)
                console.log("Got all scenarios")
                }
            })

        }
    })


router.route('/scenarios/intro')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        else{
            db.getIntroPage(scenarioID, function(result){
                if(result.length == 0){
                    res.status(404).json({error: `No scenario found with scenarioid: ${scenarioID}`})
                }
                else{
                    res.status(200).json(result)
                    console.log("Got scenario introduction")
                }
            })
        }
    })


router.route('/scenarios/task')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        else {
        db.getTaskPage(scenarioID, function(result){
            if(result.length == 0) {
                res.status(404).json({error: `No scenario task found with scenarioID: ${scenarioID}`})
            }
            else{
                res.status(200).json(result)
                console.log("Got scenario task")
            }
        })

        }
    })

router.route('/scenarios/starttogatherinfo')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        else {
        db.getInitActionSubsequentPage(scenarioID, function(result){
            if(result.length == 0) {
                res.status(404).json({error: `No scenario start to gather information found with scenarioID: ${scenarioID}`})
            }
            else{
                res.status(200).json(result)
                console.log("Got start to gather information")
            }
        })

        }
    })

router.route('/scenarios/initialReflection')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        else{
        db.getInitReflectPage(scenarioID, function(result){
            if(Object.entries(result).length == 0){
                res.status(404).json({error: `No initial reflection found with scenarioID: ${scenarioID}`})
            }
            else{
            res.status(200).json(result)
            console.log("Got initial relfection")
            }
        })
        }


    })

    .put(function(req, res){
        scenarioID = req.body.scenarioID
        studentID = req.body.studentID
        data = req.body.data
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid Scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid Student ID")
            res.end()
        }
        else{
        timestamp = new Date()
        for(prompt_num in data){
            if(!isnumber(prompt_num)){
                res.status(400).json({error: `Invalid prompt: ${prompt_num}`})
                console.log("Invalid prompt number")
                res.end()
            }
            else{
                input = data[prompt_num]
                db.addInitReflectResponse(studentID, input, prompt_num, scenarioID, timestamp, function(result){
                    if(result.length === 0){
                        res.status(404).json({error: `student ID, scenario ID or prompt does not exist in database`})
                    }
                    else{
                        res.status(200).send(result)
                        console.log("Updated initial reflection")
                    }
                })
            }
        }}
    })

router.route('/scenarios/initialReflection/response')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        studentID = req.get('studentid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid ID")
            res.end()
        }
        else{
        db.getInitReflectResponse(studentID, scenarioID, function(result){
            if(result == null) {
                res.status(404).json({error: `No initial reflection response found with one or both of the ID's`});
            }
            else{
                res.status(200).json(result)
                console.log("Got initial relfection response")
            }
        })
        }
    })



router.route('/scenarios/initialAction')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        else{
        db.getInitActionPageQuestionsAndChoices(scenarioID, function(result){
            if(result.length == 0) {
                res.status(404).json({error: `No initial actions found with scenarioID: ${scenarioID}`})
            }
            else{
            res.status(200).json(result)
            console.log("Got initial actions")
            }
        })
        }
    })

    .put(function(req, res){
        scenarioID = req.body.scenarioID
        studentID = req.body.studentID
        data = req.body.data
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid Scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid Student ID")
            res.end()
        }
        else{
            timestamp = new Date()
            for(questionID in data){
                if(!isnumber(questionID)){
                    res.status(400).json({error: `Invalid question ID: ${questionID}`})
                    console.log("Invalid Question ID")
                    res.end()
                }
                else{
                    choiceID = data[questionID]
                    if(!isnumber(choiceID)){
                        res.status(400).json({error: `Invalid choice ID: ${choiceID}`})
                        console.log("Invalid Choice ID")
                        res.end()                        
                    }
                    else{
                        db.addInitActionResponse(studentID, questionID, choiceID, scenarioID, timestamp, function(result){
                            if(result === "scenario/status ID error"){
                                res.status(404).json({error: `student ID or scenario ID does not exist in database`})
                            }
                            else if (result === "response/question/choice ID error"){
                                res.status(404).json({error: `response ID or question ID does not exist in database`})
                            }
                            else{
                                res.status(200).send(result)
                                console.log("Updated inital action")
                            }
                    })
                    }
                }
            }
        }
    })

router.route('/scenarios/finalAction')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        else {
        db.getFinalActionPageQuestionsAndChoices(scenarioID, function(result){
            if(result.length == 0) {
                res.status(404).json({error: `No scenario final action page found for scenarioID: ${scenarioID}`})
            }
            else{
                res.status(200).json(result)
                console.log("Got scenario final action page")
            }
        })

        }
    })

    .put(function(req, res){
        scenarioID = req.body.scenarioID
        studentID = req.body.studentID
        data = req.body.data
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid Scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid Student ID")
            res.end()
        }
        else{
            timestamp = new Date()
            for(questionID in data){
                if(!isnumber(questionID)){
                    res.status(400).json({error: `Invalid question ID: ${questionID}`})
                    console.log("Invalid Question ID")
                    res.end()
                }
                else{
                    choiceID = data[questionID]
                    if(!isnumber(choiceID)){
                        res.status(400).json({error: `Invalid choice ID: ${choiceID}`})
                        console.log("Invalid Choice ID")
                        res.end()                        
                    }
                    else{
                        db.addFinalActionResponse(studentID, questionID, choiceID, scenarioID, timestamp, function(result){
                            if(result.length === 0){
                                res.status(404).json({error: `student ID or scenario ID does not exist in database`})
                            }
                            else{
                                res.status(200).send(result)
                                console.log("Updated final action")
                            }
                    })
                    }
                }
            }
        }
    })

router.route('/scenarios/consequences')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid scenario ID")
            res.end()
        }
        else {
        db.getConsequencesPage(scenarioID, function(result){
            if(result.length == 0) {
                res.status(404).json({error: `No consequences found for scenarioID: ${scenarioID}`})
            }
            else{
                res.status(200).json(result)
                console.log("Got consequences")
            }
        })
        }
    })

router.route('/scenarios/stakeholders/history')

    .get(function(req, res){
        studentID = req.get('studentid')
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid student ID")
            res.end()
        }
        else{
        db.getStakeholderHistory(scenarioID, studentID, function(result){
            if(result.length == 0){
                res.status(404).json({error: `No stakeholder history found for scenarioID: ${scenarioID} and studentID: ${studentID}`})
            }
            else{
                res.status(200).json(result)
                console.log("Got stakeholder history")
            }
        })
        }


    })

router.route('/scenarios/stakeholders')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        else{
        db.getStakeholders(scenarioID, function(result){
            if(result.length == 0){
                res.status(404).json({error: `No stakeholders found for scenarioID: ${scenarioID}`})
            }
            else{
            res.status(200).json(result)
            console.log("Got all stakeholders")
            }
            })
        }
    })

    .put(function(req, res){
        scenarioID = req.body.scenarioID
        studentID = req.body.studentID
        data = req.body.data
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid Scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid Student ID")
            res.end()
        }
        else if(!isnumber(stakeholderID)){
            res.status(400).json({error: `Invalid stakeholder ID: ${stakeholderID}`})
            console.log("Invalid Stakeholder ID")
            res.end()
        }
        else {
        db.addStakeholderChoice(studentID, scenarioID, stakeholderID, function(result){
            if(result.length === 0){
                res.status(404).json({error: `student ID or scenario ID does not exist in database`})
            }
            else{
            res.status(200).send(result)
            console.log("Added stakeholder")
            }
        })
        }
    })

router.route('/scenarios/stakeholders/conversation')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        stakeholderID = req.get('stakeholderid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid Scenario ID: ${scenarioID}`})
            console.log("Invalid scenario ID")
            res.end()
        }
        else if(!isnumber(stakeholderID)){
            res.status(400).json({error: `Invalid Stakeholder ID: ${stakeholderID}`})
            console.log("Invalid stakeholder ID")
            res.end()
        }
        else{
        db.getStakeholderConvo(scenarioID, stakeholderID, function(result){
            if(result.length == 0){
                res.status(404).json({error: `No conversation found for scenarioID: ${scenarioID} and stakeholderid: ${stakeholderID}`})
            }
            else{
            res.status(200).json(result)
            console.log("Got stakeholder conversation")
            }
        })
        }

    })

router.route('/scenarios/middleReflection')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        else {
        db.getMidReflectPage(scenarioID, function(result){
            if(Object.entries(result).length == 0){
                res.status(404).json({error: `No middle reflection found with scenarioID: ${scenarioID}`})
            }
            else{
                res.status(200).json(result)
                console.log("Got initial reflection")
            }
        })
        }
    })

    .put(function(req, res){
        scenarioID = req.body.scenarioID
        studentID = req.body.studentID
        data = req.body.data
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid Scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid Student ID")
            res.end()
        }
        else{
        timestamp = new Date()
        for(prompt_num in data){
            if(!isnumber(prompt_num)){
                res.status(400).json({error: `Invalid prompt: ${prompt_num}`})
                console.log("Invalid prompt number")
                res.end()
            }
            else{
                input = data[prompt_num]
                db.addMidReflectResponse(studentID, input, prompt_num, scenarioID, timestamp, function(result){
                    if(result.length === 0){
                        res.status(404).json({error: `student ID, scenario ID or prompt does not exist in database`})
                    }
                    else{
                        res.status(200).send(result)
                        console.log("Updated middle reflection")
                    }
                })
            }
        }}
    })

router.route('/scenarios/middleReflection/response')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        studentID = req.get('studentid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid ID")
            res.end()
        }
        else{
        db.getMidReflectResponse(studentID, scenarioID, function(result){
            if(result == null) {
                res.status(404).json({error: `No middle reflection response found with one or both of the ID's`});
            }
            else{
                res.status(200).json(result)
                console.log("Got middle relfection response")
            }
        })
        }
    })

router.route('/scenarios/finalReflection')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid Scenario ID")
            res.end()
        }
        else{
            db.getFinalReflectPage(scenarioID, function(result){
                // console.log("Final Relfection-", result)
                if(Object.entries(result).length == 0){
                    res.status(404).json({error: `No final reflection found for scenarioID: ${scenarioID}`})
                }
                else{
                res.status(200).json(result)
                console.log("Got final reflection")
                }
            })
        }

    })

    .put(function(req, res){
        scenarioID = req.body.scenarioID
        studentID = req.body.studentID
        data = req.body.data
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid Scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid Student ID")
            res.end()
        }
        else{
        timestamp = new Date()
        for(prompt_num in data){
            if(!isnumber(prompt_num)){
                res.status(400).json({error: `Invalid prompt: ${prompt_num}`})
                console.log("Invalid prompt number")
                res.end()
            }
            else{
                input = data[prompt_num]
                db.addFinalReflectResponse(studentID, input, prompt_num, scenarioID, timestamp, function(result){
                    if(result.length === 0){
                        res.status(404).json({error: `student ID, scenario ID or prompt does not exist in database`})
                    }
                    else{
                        res.status(200).send(result)
                        console.log("Updated final reflection")
                    }
                })
            }
        }}
    })


router.route('/scenarios/finalReflection/response')

        .get(function(req, res){
            scenarioID = req.get('scenarioid')
            studentID = req.get('studentid')
            if(!isnumber(scenarioID)){
                res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
                console.log("Invalid ID")
                res.end()
            }
            if(!isnumber(studentID)){
                res.status(400).json({error: `Invalid student ID: ${studentID}`})
                console.log("Invalid ID")
                res.end()
            }
            else{
            db.getFinalReflectResponse(studentID, scenarioID, function(result){
                if(result == null) {
                    res.status(404).json({error: `No middle reflection response found with one or both of the ID's`});
                }
                else{
                    res.status(200).json(result)
                    console.log("Got final relfection response")
                }
            })
            }
        })

router.route('/scenarios/conclusion')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid ID")
            res.end()
        }
        else {
        db.getConclusionPage(scenarioID, function(result){
            if(result.length == 0) {
                res.status(404).json({error: `No scenario found with scenarioid: ${scenarioID}`})
            }
            else {
                res.status(200).json(result)
                console.log("Got scenario conclusion")
            }
        })

        }
    })

router.route('/scenarios/feedback')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        studentID = req.get('studentid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid Scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid Student ID")
            res.end()
        }
        else {
            db.getFeedback(scenarioID, studentID, function(result){
                if(result.length == 0) {
                    res.status(404).json({error: `No conversation found for scenarioID: ${scenarioID} and studentid: ${studentID}`})
                }
                else {
                    res.status(200).json(result)
                    console.log("Got student feedback")
                }
            })
        }
    })

router.route('/scenarios/lastPage')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        studentID = req.get('studentid')
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid Scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid Student ID")
            res.end()
        }
        else {
            db.getLastPage(scenarioID, studentID, function(result){
                if(result.length == 0) {
                    res.status(404).json({error: `No Last Page found for scenarioID: ${scenarioID} and studentid: ${studentID}`})
                }
                else {
                    res.status(200).json(result)
                    console.log("Got Last Page")
                }
            })
        }
    })

    .put(function(req, res){
        scenarioID = req.body.scenarioID
        studentID = req.body.studentID
        data = req.body.data
        if(!isnumber(scenarioID)){
            res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
            console.log("Invalid Scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)){
            res.status(400).json({error: `Invalid student ID: ${studentID}`})
            console.log("Invalid Student ID")
            res.end()
        }
        else{
        db.addLastPage(studentID, scenarioID, data, function(result){
          if(result.length === 0){
              res.status(404).json({error: `student ID or scenario ID does not exist in database`})
          }
          else{
              res.status(200).send(result)
              console.log("Updated Last Page")
          }
        })}
    })


// please delete this test function before merging
router.route('/scenarios/test')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        // let text = req.get('text')
        // if(!isnumber(scenarioID)){
        //     res.status(400).json({error: `Invalid scenario ID: ${scenarioID}`})
        //     console.log("Invalid ID")
        //     res.end()
        // }
        // else{
            db.loadScenarioCSV(scenarioID, function(result){
            // db.getScenarioCSV(scenarioID, function(result){
                if(result.length == 0){
                    res.status(404).json({error: `No scenario found with scenarioid: ${scenarioID}`})
                }
                else{
                    res.status(200).json(result)
                    console.log("Got scenario introduction")
                    
                }
            })
        // }
    })


app.use('/api', router)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
