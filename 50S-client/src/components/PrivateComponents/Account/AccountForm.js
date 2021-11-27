import React, { useState } from 'react';
import { changePath, createAccount } from '../../../store/reducers/Account';
import { addError, removeError } from '../../../store/reducers/error';
import { refreshAccount } from '../../../store/reducers/profileReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Select } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import {
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
  Slider,
  InputLabel
} from '@material-ui/core';
export default function AccountForm() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const strategyList = useSelector(state => state.strategyList)
  const [account, setAccount] = useState({
    account_name: "",
    target: null,
    strategy: "",
    strategy_name: "",
    profit: null, 
    stop: null,
    max_loss: null,
    max_win: null,
    weekly_risk: null,
    risk: 5,
    radio:"",
    max_profit:0
  })
  const soros = (entry, payout, rep) => {
    let initial = entry
    for(let i = 0; i < rep; i++){
      entry = entry * ((payout / 100) + 1)
    }
    return Math.round(( entry - initial) * 100 ) /100
  }
  function handleChangeAccount(e){
    let {name, value} = e.target
    if(value < 0){
      value = 0
      setAccount(prevInfo => {
        return {
          ...prevInfo,
          [name]: value
        };
      })
    } else {
      setAccount(prevInfo => {
        return {
          ...prevInfo,
          [name]: value
        };
      })
    }
    if(value === "soros"){
      let rep = account.profit / account.max_win
      let remain = (account.profit % account.max_win) * account.risk
      let result = 0
      let entry = account.risk
      for (let i = 0; i < rep; i++){
        entry = soros(entry, 80, account.max_win)
      }
      result = entry + remain
      setAccount(prevInfo => {
        return {
          ...prevInfo,
          max_profit: result
        };
      })
    } else if(value === "mao"){
      let result = account.risk * 0.8 * account.profit
      setAccount(prevInfo => {
        return {
          ...prevInfo,
          max_profit: result
        };
      })
    } else if(value === "fixo"){
      let result = account.risk
      for(let i = 0; i < account.profit; i++){
        let add = Math.round(( result * 0.8) * 100 ) /100
        result += add
        
      }
      setAccount(prevInfo => {
        return {
          ...prevInfo,
          max_profit: Math.round(result * 100) /100
        };
      })
    }
  }

  function handleRisk(event, newValue){
    setAccount(prevInfo => {
      return {
        ...prevInfo,
        risk: newValue
      }
    })
  }
  function handleWeeklyRisk(event, newValue){
    setAccount(prevInfo => {
      return {
        ...prevInfo,
            weekly_risk: newValue
      }
    })
  }
  function handleCreateAccount(e){
    e.preventDefault()
    dispatch(createAccount({
      path: "http://localhost:5000",
      profile_id: profile.data.id,
      brooker_id: "612bdf3d80000a5e4fbaf2eb",
      input: account
    }))
    .then(unwrapResult).then((accountList) => {
      try{ dispatch(refreshAccount(accountList.profile))} catch(e){console.log(e)}
      dispatch(removeError())
      dispatch(changePath("created"))
    }).catch((error) => {
      alert(error.message)
      dispatch(addError(error))
    })

  }
  
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
        <form>
          <Paper style={{ padding: 16 }}>
              <Typography variant="h4" align="center" component="h1" gutterBottom>
              Create Account
              </Typography>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  name="account_name"
                  type="text"
                  label="Account Name"
                  onChange={handleChangeAccount}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  name="target"        
                  type="number"
                  label="How much you want to achive"
                  onChange={handleChangeAccount}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                  Strategy
                </InputLabel>
                <Select
                  fullWidth
                  name="strategy"
                  label="Select Strategy"
                  onChange={handleChangeAccount}
                  formControlProps={{ fullWidth: true }}
                >
                {strategyList.strategies.map(strategy => <MenuItem value={strategy.strategy_name}>{strategy.strategy_name}</MenuItem>)
                }
                </Select>
              </Grid>
              {(account.strategy === "createStrategy") &&  
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
                      onChange={handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="stop"
                      type="number"
                      label="Stop"
                      value={account.stop}
                      onChange={handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="profit"
                      type="number"
                      label="Profit"
                      value={account.profit}
                      onChange={handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={12}>
                      <Typography id="discrete-slider" gutterBottom>
                          Risk {account.risk}%
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
                          onChange={handleRisk}
                      />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="max_loss"
                      type="number"
                      label="Max Loss"
                      value={account.max_loss}
                      onChange={handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="max_win"
                      type="number"
                      label="Max Win"
                      value={account.max_win}
                      onChange={handleChangeAccount}
                    />
                  </Grid>
                  
                  <Grid item xs={8}>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={handleChangeAccount}>
                    <FormControlLabel name="radio" value="soros" control={<Radio />} label="Soros" />
                    <FormControlLabel name="radio" value="mao" control={<Radio />} label="Mão Fixa" />
                    <FormControlLabel name="radio" value="fixo" control={<Radio />} label="Juros Fixo" />
                  </RadioGroup>
                  {}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography id="discrete-slider" gutterBottom>
                          Weekly Risk {account.weekly_risk} steps
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
                          onChange={handleWeeklyRisk}
                      />
                  </Grid>
                  <h1>Maximo ganho: {account.max_profit}%</h1>
                </React.Fragment>
              }
              
              <Grid item style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleCreateAccount}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
    </div>
  );
}

                // <Grid item>
                //   <FormControl component="fieldset">
                //     <FormLabel component="legend">Best Stooge</FormLabel>
                //     <RadioGroup row aria-label="gender" name="gender1" >
                //         <FormControlLabel value="female" control={<Radio />} label="Female" />
                //         <FormControlLabel value="male" control={<Radio />} label="Male" />
                //         <FormControlLabel value="other" control={<Radio />} label="Other" />
                //         <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                //     </RadioGroup>
                //   </FormControl>
                // </Grid>
                // <Grid item>
                //   <FormControl component="fieldset">
                //     <FormLabel component="legend">Sauces</FormLabel>
                //     <FormGroup row>
                //       <FormControlLabel
                //         label="Ketchup"
                //         control={
                //           <Field
                //             name="sauces"
                //             component={Checkbox}
                //             type="checkbox"
                //             value="ketchup"
                //           />
                //         }
                //       />
                //       <FormControlLabel
                //         label="Mustard"
                //         control={
                //           <Field
                //             name="sauces"
                //             component={Checkbox}
                //             type="checkbox"
                //             value="mustard"
                //           />
                //         }
                //       />
                //       <FormControlLabel
                //         label="Salsa"
                //         control={
                //           <Field
                //             name="sauces"
                //             component={Checkbox}
                //             type="checkbox"
                //             value="salsa"
                //           />
                //         }
                //       />
                //       <FormControlLabel
                //         label="Guacamole 🥑"
                //         control={
                //           <Field
                //             name="sauces"
                //             component={Checkbox}
                //             type="checkbox"
                //             value="guacamole"
                //           />
                //         }
                //       />
                //     </FormGroup>
                //   </FormControl>
                // </Grid>
                // <Grid item xs={12}>
                //   <Field
                //     fullWidth
                //     name="notes"
                //     component={TextField}
                //     multiline
                //     label="Notes"
                //   />
                // </Grid>