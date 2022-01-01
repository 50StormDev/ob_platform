import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {
    Grid,
    Button,
    Select,
    InputLabel,
    MenuItem,
    Typography
} from '@material-ui/core';

let options = [];
for(let i = 0; i <= 4; i+=0.25){
    let minutes = 60 * i
    let hours = 0
    let result = ""
    if(minutes >= 60){
        hours = parseInt(minutes / 60)
        minutes = minutes % 60
        result = `${hours}:${minutes}`
    } else {
        result = `0:${minutes}`
    }
    
    options.push(result)
}


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
    alignContent: "space-evenly",
    alignItems: "flex-end"
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
  }
}));

export default function TimeCard(){
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid>
                    <Typography  component="h1" variant="h4" noWrap>TimeCard</Typography>
            </Grid>
            <form className={classes.form}>
                <Grid className={classes.inputBox}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Choose Shift
                        </InputLabel>
                        <Select
                        fullWidth
                        name="account"
                        label="Select Strategy"
                        onChange = {()=> {console.log("worked")}}
                        formControlProps={{ fullWidth: true }}
                        >
                            <MenuItem value="E1">Day</MenuItem>
                            <MenuItem value="E3">Night</MenuItem>
                        </Select>
                </Grid>
                <Grid className={classes.inputBox}>
                    <Button
                        onClick={()=>console.log("In")}
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        name="Entry"
                        label="Entry"
                        value=""
                    >In</Button>
                </Grid>
                <Grid className={classes.inputBox}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    How much Overtime
                    </InputLabel>
                    <Select
                    fullWidth
                    default="0:0"
                    name="overtime"
                    label="Overtime"
                    onChange = {()=> {console.log("worked")}}
                    formControlProps={{ fullWidth: true }}
                    >
                    
                    { options.map(item => <MenuItem value={item}>{item}</MenuItem>) } 
                    </Select>
                </Grid>
                <Grid className={classes.inputBox}>
                    <Button
                        onClick={() => console.log("out")}
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        name="Entry"
                        label="Entry"
                        value=""
                    >Out</Button>
                </Grid>
            </form>
        </React.Fragment>
    )
}