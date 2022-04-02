import React from 'react';
import {
  TextField,
  Divider,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Slider, 
  Switch
} from '@material-ui/core';

export default function AccountStrategy(props){
    
    return(
       <React.Fragment>
          <Grid item xs={12}>
            <Divider style={{marginTop:"20px"}}/>
            <Typography style={{marginTop:"20px", marginBottom:"0"}} variant="h4" align="center" component="h1" gutterBottom>
            Create Strategy
            </Typography>
          </Grid>
          <Grid container alignItems="flex-start" spacing={3}>
            <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  name="strategy_name"
                  type="text"
                  label="Strategy Name"
                  onChange={props.handleChangeAccount}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  name="amount"        
                  type="number"
                  label="Amount to be analyse"
                  onChange={props.handleChangeAccount}
                />
              </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="max_loss"
              type="number"
              label="Stop Loss"
              value={props.account.max_loss}
              onChange={props.handleChangeAccount}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="max_win"
              type="number"
              label="Take Profit"
              value={props.account.max_win}
              onChange={props.handleChangeAccount}
            />
          </Grid>
          <Grid item xs={8}>
              <Typography id="discrete-slider" gutterBottom>
                  Risk {props.account.risk}%
              </Typography>
              <Slider
                defaultValue={5}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  name="risk"
                  step={1}
                  marks
                  min={1}
                  max={50}
                  onChange={props.handleRisk}
              />
          </Grid>   
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Switch color="primary" checked={props.account.otc} onChange={props.handleOTC} name="otc" />
              }
              label="Weekends"
            />
          </Grid>             
          <Grid item xs={8}>
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={props.handleChangeAccount}>
            <FormControlLabel name="method" value="soros" control={<Radio />} label="Soros" />
            <FormControlLabel name="method" value="mao" control={<Radio />} label="Mão Fixa" />
            <FormControlLabel name="method" value="fixo" control={<Radio />} label="Juros Fixo" />
          </RadioGroup>
          </Grid>
          <Grid item xs={4}>
            <Typography id="discrete-slider" gutterBottom>
                  Weekly Risk {props.account.weekly_risk} steps
              </Typography>
              <Slider
                  value={props.account.weekly_risk}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  name="weekly_risk"
                  step={1}
                  marks
                  min={1}
                  max={5}
                  onChange={props.handleWeeklyRisk}
              />
          </Grid>
          
          {props.account.method === "soros" && <Grid item xs={6}>
            <TextField
              fullWidth
              name="consecutive_win"
              type="number"
              label="Consecutive Win"
              value={props.account.consecutive_win}
              max={props.account.consecutive_win}
              onChange={props.handleChangeAccount}
            />
          </Grid>}
          {props.account.otc === true && 
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="consecutive_loss"
              type="number"
              label="Consecutive Loss"
              max={props.account.max_loss}
              value={props.account.consecutive_loss}
              onChange={props.handleChangeAccount}
            />
          </Grid>
          }
          <Grid item xs={12}>
            <h2> Profit/Day : ${props.account.max_profit}%</h2>
            <h2> Days of consecutive loss : {props.account.max_chances} chances</h2>
            <h2> Max Loss in one week : ${props.account.deposit}</h2>
            <h2> Max Profit in one week (7 takes) : ${props.account.perfect_result}</h2>
          </Grid>
          
        </React.Fragment>
    )
}