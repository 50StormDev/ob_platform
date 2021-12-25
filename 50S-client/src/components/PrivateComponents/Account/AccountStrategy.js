import React from 'react';
import {
  TextField,
  Divider,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Slider
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="strategy_name"
                      type="text"
                      label="Strategy Name"
                      onChange={props.handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="stop"
                      type="number"
                      label="Stop"
                      value={props.account.stop}
                      onChange={props.handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="profit"
                      type="number"
                      label="Profit"
                      value={props.account.profit}
                      onChange={props.handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                          max={20}
                          onChange={props.handleRisk}
                      />
                  </Grid>                
                  <Grid item xs={8}>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={props.handleChangeAccount}>
                    <FormControlLabel name="radio" value="soros" control={<Radio />} label="Soros" />
                    <FormControlLabel name="radio" value="mao" control={<Radio />} label="Mão Fixa" />
                    <FormControlLabel name="radio" value="fixo" control={<Radio />} label="Juros Fixo" />
                  </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography id="discrete-slider" gutterBottom>
                          Weekly Risk {props.account.weekly_risk} steps
                      </Typography>
                      <Slider
                        defaultValue={2}
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
                  <Grid item xs={12}>
                    <Divider style={{marginTop:"20px"}}/>
                    <Typography style={{marginTop:"20px", marginBottom:"0"}} variant="h" align="center" component="h3" gutterBottom>
                    OTC Strategy
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="max_loss"
                      type="number"
                      label="Max Loss"
                      min={props.account.stop}
                      value={props.account.max_loss}
                      onChange={props.handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="max_win"
                      type="number"
                      label="Max Win"
                      value={props.account.max_win}
                      min={props.account.profit}
                      onChange={props.handleChangeAccount}
                    />
                  </Grid>
                  <h1>Maximo ganho: {props.account.max_profit}%</h1>
                </React.Fragment>
    )
}