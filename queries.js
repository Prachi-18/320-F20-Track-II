const Pool = require('pg').Pool
const pool = new Pool({
  user: 'goon',
  host: 'localhost',
  database: 'simulator',
  password: 'enterdb',
  port: 5432,
})

//get all scenarios
/*
const getScenarios = (request, response) => {
    pool.query('SELECT * FROM scenarios ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log(`Got all scenarios`)
    })
}
*/

//functions to test api calls on mock db

function getScenarios(studentID, callback){
  pool.query('SELECT id, name, description FROM scenarios ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
  // console.log(studentID)
  //console.log(results.rows)
  callback(results.rows)  
  })  
}

function getIntro(scenarioID, callback){
  pool.query('SELECT introduction from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    // console.log(scenarioID)
    callback(results.rows)
  })
}

function getTask(scenarioID, callback){
  pool.query('SELECT task from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    // console.log(scenarioID)
    callback(results.rows)
  })
}


function addInitReflect(studentID, scenarioID, data, callback){
  console.log(studentID, scenarioID, data)
  pool.query('UPDATE responses set initialreflection = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, data], (error,results) => {
    if(error){
      throw error
    }

    callback(`Initial Reflection updated for studentID: ${studentID}`)
  })
}


/*

//get scenario by id
const getScenraioById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM scenarios WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log(`Got scenario with id: ${request.params.id}`)
    })
}

//create a new scenraio
const createScenario = (request, response) => {
    // const name = request.params.name
    // const stakeholder = request.params.stakeholder
    // console.log(name)
    const { name, stakeholder } = request.body
  
    pool.query('INSERT INTO scenarios (name, stakeholder) VALUES ($1, $2)', [name, stakeholder], (error, results) => {
      if (error) {
        throw error
      }
      // console.log(results.rows)
      response.status(200).send(`Created scenario with name: ${name} and stakeholder: ${stakeholder}`)
      console.log(`Created scenario with name: ${name} and stakeholder: ${stakeholder}`)
    })
}

//update a scenario
const updateScenario = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, stakeholder } = request.body
  
    pool.query(
      'UPDATE scenarios SET name = $1, stakeholder = $2 WHERE id = $3',
      [name, stakeholder, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Updated scenario with ID: ${id}`)
        console.log(`Updated scenario with ID: ${id}`)
      }
    )
}

//delete a scenario
const deleteScenario = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM scenarios WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Deleted scenario with ID: ${id}`)
      console.log(`Deleted scenario with id: ${id}`)
    })
}

*/

//export functions
module.exports = {
    getScenarios,
    getIntro,
    getTask,
    addInitReflect,
    // getScenraioById,
    // createScenario,
    // updateScenario,
    // deleteScenario,
}