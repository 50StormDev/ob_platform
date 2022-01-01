import React from 'react';
import {
  Container,
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    borderRadius: "10px"
  }, 
  cont:{
    backgroundColor: "white"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: '7px 15px 15px',
    borderRadius: "3px",
    display: "flex",
    alignContent: "space-evenly"
  },
  inputBox: {
    width: "100%",
    marginRight: "10px"
  },
  mainContent: {
    background: "#ffff",
    opacity: "1",
    padding: "35px",
    borderRadius: "10px"
  },
  result: {
    display: "flex",
    justifyContent : "end",
    marginTop: "1%",
    marginRight: "2%"
  }
}));

//get all businessDay from the actual month
function getBusinessDay(NMonth, last = 31){
  const day = new Date()
  const month = NMonth
  const year = day.getFullYear()
  let businessDay = 0
  for(let i = 1; i <= last; i++){
    let days = new Date(year, month, i)
    if(days.getMonth() !== month){
      return businessDay
    } else {
      if(days.getDay() > 0 && days.getDay()<6){
        businessDay += 1
      }
    }
  }
  return businessDay
}

function thousandSeparator(number){
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

//calculate salary
function calculateSalary(days, mph, bonus, gas, hollyday, overtime, night){
  return (days * (mph * 8)) + bonus + (gas * days) - (hollyday * (mph * 8)) + ((mph * 1.25) * overtime) + ((mph * 0.25) * 3 * night)
}

export default function SalaryPrediction(props){
    const classes = useStyles();
    const [salary, setSalary] = React.useState({
        days: getBusinessDay(props.day.getMonth()), 
        mph: 1450, 
        bonus: 70000,
        gas: 660,
        hollyday: 2,
        overtime: 0,
        night: 0
    })
    function handleChange(e){
        let { name, value } = e.target
        if(value < 0){
            value = 0
        }
        if(name === "days"){
            if(value > getBusinessDay(props.day.getMonth())){
                value = getBusinessDay(props.day.getMonth())
            }
        }
        setSalary(prev => {
            return {
                ...prev,
                [name]: parseInt(value)
            }
        })
    }
    return(
       <React.Fragment>
            <Container className={classes.mainContent}>
                <form className={classes.form}>
                    <Grid className={classes.inputBox}>
                    <TextField
                    variant="outlined"
                    required
                    type="number"
                    min="0"
                    fullWidth
                    value={salary.days}
                    id="day"
                    label="days"
                    name="days"
                    onChange={handleChange}
                    />
                    </Grid>
                    <Grid className={classes.inputBox}>
                    <TextField
                        variant="outlined"
                        required
                        type="number"
                        min="0"
                        fullWidth
                        value={salary.mph}
                        id="mph"
                        label="¥/H"
                        name="mph"
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid className={classes.inputBox}>
                    <TextField
                        variant="outlined"
                        required
                        type="number"
                        min="0"
                        fullWidth
                        value={salary.bonus}
                        id="bonus"
                        label="bonus"
                        name="bonus"
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid className={classes.inputBox}>
                    <TextField
                        variant="outlined"
                        required
                        type="number"
                        min="0"
                        fullWidth
                        value={salary.gas}
                        id="gas"
                        label="gas"
                        name="gas"
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid className={classes.inputBox}>
                    <TextField
                        variant="outlined"
                        required
                        type="number"
                        min="0"
                        fullWidth
                        value={salary.hollyday}
                        id="hollyday"
                        label="hollyday"
                        name="hollyday"
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid className={classes.inputBox}>
                    <TextField
                        variant="outlined"
                        required
                        type="number"
                        min="0"
                        fullWidth
                        value={salary.overtime}
                        id="overtime"
                        label="overtime"
                        name="overtime"
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid className={classes.inputBox}>
                    <TextField
                        variant="outlined"
                        required
                        type="number"
                        min="0"
                        fullWidth
                        value={salary.night}
                        id="night"
                        label="night"
                        name="night"
                        onChange={handleChange}
                    />
                    </Grid>
                
                </form>
                <Grid className={classes.result}>
                    <Typography  component="h1" variant="h4" noWrap> Salary Prediction ¥ {thousandSeparator(calculateSalary(getBusinessDay(props.day.getMonth()), salary.mph, salary.bonus, salary.gas, salary.hollyday, salary.overtime, salary.night))}</Typography>
                </Grid>
                
            </Container>
        </React.Fragment>
    )
}