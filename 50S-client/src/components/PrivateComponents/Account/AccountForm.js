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
  InputLabel,
} from '@material-ui/core';
import AccountStrategy from './AccountStrategy';

export default function AccountForm() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const strategyList = useSelector(state => state.strategyList)
  const [account, setAccount] = useState({
    account_name: "", // name of the account
    account_type: "client", // type if Personal or a Client
    target: 0,  // how much wants to achive
    strategy: "", // strategy name if use one of the list
    strategy_name: "",  // name of the new strategy
    amount:0,
    max_loss: 1, // set up the stop loss
    max_win: 1, // set up take profit
    consecutive_loss: 1,  // max consecutive loss, probably use in OTC market
    consecutive_win: 2, // consecutive win to set up breakpoint in soros (should appers when the method is soros)
    risk: 5,  // the percentage of risk per day 
    weekly_risk: 2, // set up stop loss of the week
    method:"",  // what method it will be used
    max_profit:0, // calculate the max percentage per method to be compared
    perfect_result: 0,
    max_chances: 0,
    deposit: 0,
    otc: false // if this account will be traded on weekends or not
  })

  // round the values
  const round = (number) => {
    return Math.round(number * 100) / 100
  }

 // calculate how many lives until bankrupt
  const chances = (balance, percentage, count = 0) => {
    if (balance <= 1) {
      return count - 1
    }
    count++  
    balance = balance * ((100 - percentage)/ 100)
    return chances(balance, percentage, count)
  }

  // calculate soros
  const soros = (entry, payout, rep) => {
    let initial = entry
    for(let i = 0; i < rep; i++){
      entry = entry * ((payout / 100) + 1)
    }
    return round(( entry - initial) * 100 ) /100
  }

  // Calculate the perfect week
  const perfectWeek = (balance, dayPercentage, count = 0) => {
    if(count === 7) {
      console.log(balance)
      return balance
    }
    count++
    balance = round(balance * ((dayPercentage / 100) + 1))
    return perfectWeek(balance, dayPercentage, count)
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
      let rep = account.max_win / account.consecutive_win
      let result = 0
      let entry = account.risk
      
      for (let i = 1; i <= rep; i++){
        entry = soros(entry, 80, account.consecutive_win)
      }
      let remain = account.max_win % account.consecutive_win
      for (let i = 1; i <= remain; i++){
        entry = entry + (100 + entry) * (account.risk / 100)
      }
      result = round(entry)
      let perfect = perfectWeek(account.amount, result)
      setAccount(prevInfo => {
        return {
          ...prevInfo,
          max_profit: result,
          perfect_result: perfect
        };
      })
    } else if(value === "mao"){
      let result = account.risk * 0.8 * account.max_win
      result = round(result)
      let perfect = perfectWeek(account.amount, result)
      setAccount(prevInfo => {
        return {
          ...prevInfo,
          max_profit: result,
          perfect_result: perfect
        };
      })
    } else if(value === "fixo"){
      let result = round(account.risk)  
      for(let i = 1; i < account.max_win; i++){
        let add = result * 0.8
        result += add
      }
      result = round(result)
      let perfect = perfectWeek(account.amount, result)
      setAccount(prevInfo => {
        return {
          ...prevInfo,
          max_profit: Math.round(result * 100) /100,
          perfect_result: perfect
        };
      })
    }
  }

  function handleRisk(event, newValue){
    let perfect = chances(account.amount, newValue)
    setAccount(prevInfo => {
      return {
        ...prevInfo,
        risk: newValue,
        max_chances: perfect
      }
    })
  }
  function handleWeeklyRisk(event, newValue){
    let deposit = 0
    let balance =  account.amount
    for (let i = 1; i <= newValue; i++){
      let order = balance * (account.risk / 100)
      deposit = deposit + order 
      balance = balance - order
    }
    console.log(deposit)
    setAccount(prevInfo => {
      return {
        ...prevInfo,
            weekly_risk: newValue,
            deposit: deposit
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

  function handleOTC(){
    setAccount(prevInfo => {
      return {
        ...prevInfo,
        otc: !prevInfo.otc
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
            <Grid container alignItems="flex-start" spacing={3}>
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
              {(account.strategy !== "createStrategy") && 
              <Grid item xs={12} style={{display: "flex", justifyContent: "space-between"}}>
                <Grid item xs={6}>
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
                  <MenuItem>
                    <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleCreateStrategy}
                    >
                      Create Custom Strategy
                    </Button>
                  </MenuItem>
                  </Select>
                </Grid>
                
              </Grid>}
              {(account.strategy === "createStrategy") &&  
                <AccountStrategy
                  account={account}
                  handleChangeAccount={handleChangeAccount}
                  handleRisk={handleRisk}
                  handleWeeklyRisk={handleWeeklyRisk}
                  handleOTC={handleOTC}
                  handleChances = {chances}
                />
              }
              
              <Grid item xs={12} style={{display: "flex", justifyContent: "space-between"}}> 
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={()=>{dispatch(changePath(""))}}
                >
                  Go Back
                </Button>
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