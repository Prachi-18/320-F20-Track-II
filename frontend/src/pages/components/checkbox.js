import React,{useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import { BASE_URL, STUDENT_ID, SCENARIO_ID } from "../../constants/config";
import axios from 'axios';
import { ScenariosContext } from "../../Nav";
import { TrainOutlined, TrainRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function ErrorRadios(props) 
{
  let   content_url = props.content_url;
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose carefully');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value !== '') {
      setHelperText('Good Answer!');
      setError(true);
      // props.pages[props.nextPageName].completed = true;
      // props.nextPage();
      props.handleResponse(value).then(res => {
        props.pages[props.nextPageName].completed = true;
        props.nextPage();
      }).catch(err => alert(err))
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  const [scenarios, setScenarios] = React.useContext(ScenariosContext);
  const [choices, setChoices] = React.useState([]);

  useEffect(() => {
    // backend call
    console.log("base: " + BASE_URL + " scenario: " + SCENARIO_ID + " student: " + STUDENT_ID);
    axios({
      method: 'get',
      url: BASE_URL + content_url,
      headers: {
        scenarioID: scenarios.currentScenarioID,
        studentID: STUDENT_ID,
      }
    }).then(response => {
      console.log(response);

      const x = [];
      for (var i = 0; i < response.data.mcq_choices.length; i++)
        x.push({value:response.data.mcq_choices_id[i], label: response.data.mcq_choices[i]});
      console.log(x);
      setChoices(choices => x);
      //const clone = Array.from(response.data.mcq_choices_id);
    }).catch((err)=>{
      console.log("err",err);
      //alert(err);
    });
  }, [scenarios])

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
          {choices.map((choice, index) => (
              <FormControlLabel value={choice.value.toString()} key={choice.value.toString()} control={<Radio />} label={choice.label} />
            ))
          }
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          Submit
        </Button>
      </FormControl>
    </form>
  );
}

