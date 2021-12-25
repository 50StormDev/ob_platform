import React, { useState } from 'react';
import { changePath, createAccount } from '../../../store/reducers/Account';
import { addError, removeError } from '../../../store/reducers/error';
import { refreshAccount } from '../../../store/reducers/profileReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  MenuItem,
  CssBaseline,
  Button,
  Paper,
  TextField,
  Select,
  Typography,
  Grid,
  InputLabel
} from '@material-ui/core';
import AccountStrategy from './AccountStrategy';

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

  // round the values
  const round = (number) => {
    return Math.round(number * 100) / 100
  }

  // calculate soros
  const soros = (entry, payout, rep) => {
    let initial = entry
    for(let i = 0; i < rep; i++){
      entry = entry * ((payout / 100) + 1)
    }
    return round(( entry - initial) * 100 ) /100
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
      result = round(result)
      setAccount(prevInfo => {
        return {
          ...prevInfo,
          max_profit: result
        };
      })
    } else if(value === "mao"){
      let result = account.risk * 0.8 * account.profit
      result = round(result)
      setAccount(prevInfo => {
        return {
          ...prevInfo,
          max_profit: result
        };
      })
    } else if(value === "fixo"){
      let result = round(account.risk * 0.8)  
      for(let i = 1; i < account.profit; i++){
        let add = result * 0.8
        result += add
      }
      result = round(result)
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
  function handleCreateStrategy(){
    setAccount(prevInfo => {
      return {
        ...prevInfo,
        strategy: "createStrategy"
      }
    })
  }
  
  return (
    <div style={{ padding: 40, margin: 'auto', maxWidth: 700 }}>
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
                {(account.strategy !== "createStrategy") && <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleCreateStrategy}
                >
                  Create Custom Strategy
                </Button>
                }
              </Grid>
              {(account.strategy === "createStrategy") &&  
                <AccountStrategy
                  account={account}
                  handleChangeAccount={handleChangeAccount}
                  handleRisk={handleRisk}
                  handleWeeklyRisk={handleWeeklyRisk}
                />
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