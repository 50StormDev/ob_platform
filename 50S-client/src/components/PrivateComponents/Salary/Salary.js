import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { TextField, Container, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SalaryPrediction from './SalaryPrediction'
import TimeCard from './TimeCard'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    borderRadius: "10px"
  },
  mainContent: {
    background: "#ffff",
    opacity: "1",
    padding: "35px",
    borderRadius: "10px"
  }
}));
export default function Salary() {
  const classes = useStyles();
  const [day, setDay] = React.useState(new Date());
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            orientation="landscape"
            openTo="day"
            value={day}
            // shouldDisableDate={isWeekend}
            onChange={(newValue) => {
              setDay(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Container>
      <Container maxWidth="lg" className={classes.container}>
        <Grid className={classes.mainContent}>
            <TimeCard/>
        </Grid>
      </Container>
      <Container maxWidth="lg" className={classes.container}>
        <SalaryPrediction day={day}/>
      </Container>
      
    </React.Fragment>
    
    
  );
}