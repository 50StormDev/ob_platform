import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import {
    Grid,
    Button,
    Select,
    InputLabel,
    MenuItem,
    Typography
} from '@material-ui/core';
import { apiCall } from '../../../services/api';

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
    const currentUser = useSelector(state => state.currentUser)
    const [time, setTime] = React.useState({
        shift: "",
        overtime: 0
      })

    function handleChange(e){
        let {name, value} = e.target
        // convert overtime string to number
        if(name === "overtime"){
            let data = [0,0]
            data = value.split(":")
            value = data[0] + (data[1] / 60)
        }
        setTime(prev => {
            return {
                ...prev,
                [name]: value 
            }
        })
    }   

    function timeNow(){
        let now = new Date()
        let hour = now.getHours();
        let minutes = now.getMinutes();
        return `${hour}:${minutes}`
    }

    function handleEntry(){
        apiCall("post", `http://localhost:5000/salary/${currentUser.user.id}/entry`,{
           workShift: time.shift,
           entry: timeNow() 
        })
    }

    function handleOut() {
        apiCall("post", `http://localhost:5000/salary/${currentUser.user.id}/out`,{
           ovetime: time.overtime,
           out_time: timeNow() 
        })
    }

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
                        name="shift"
                        label="Choose Shift"
                        onChange = {handleChange}
                        formControlProps={{ fullWidth: true }}
                        >
                            <MenuItem value="E1">Day - E1</MenuItem>
                            <MenuItem value="E3">Night - E3</MenuItem>
                        </Select>
                </Grid>
                <Grid className={classes.inputBox}>
                    <Button
                        onClick={handleEntry}
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
                    onChange = {handleChange}
                    formControlProps={{ fullWidth: true }}
                    >
                    
                    { options.map(item => <MenuItem value={item}>{item}</MenuItem>) } 
                    </Select>
                </Grid>
                <Grid className={classes.inputBox}>
                    <Button
                        onClick={handleOut}
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