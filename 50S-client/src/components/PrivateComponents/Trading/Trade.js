import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DayLimit from './DayLimit';
import TradeDropdown from './TradeDropdown';
import Assets from '../../../assets';
import { MenuItem, Grid, InputLabel, Select } from '@material-ui/core';
import { addOrder } from '../../../store/reducers/oderReducer';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  mainContent: {
    color:"black",
    opacity: "1",
    marginTop: "60px",
    padding: "57px",
    borderRadius: "12px",
    backgroundColor:"#ffff"
  }
});

export default function Trade() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const strategyList = useSelector(state => state.strategyList)
  const orders = useSelector(state => state.orders)

  let account_list = profile.data.accounts
  const [order, setorder] = useState({
    name: null,
    pair: null,
    balance: null,
    entry: null,
    take: null,
    stop: null,
    payout: null,
    wins:0,
    losses:0,
    consecutive_loss:0, 
    max_loss:0, 
    max_win:0, 
    risk:0
  })

  const classes = useStyles();
  
  function setUpTrade(e) {
    //get the value of the choosed one
    const { value } = e.target
    //retrieve the choosed one from the account list
    const choosed = account_list.filter(item => item._id === value)
    //get the strategy choosed by the account
    const strategy = strategyList.strategies.filter(item => item._id === choosed[0].strategy)
    //
    //setup the strategy and set the order rules
    const {consecutive_loss, max_loss, max_win, risk} = strategy[0]
    
    // calculate take
    // function calculateTake(soros, balance, payout, max_wins){
    //   if(soros === max_wins){
    //     return balance
    //   } else {
    //     entry * (payout / 100)
    //   }
    // }
    //setup the data to be place on the state
    let name = choosed[0].account_name
    let balance = choosed[0].balance
    let entry = (balance / risk)
    let take = Math.round((((entry * 1.8) * 1.8) - entry)* 100)/ 100
    let stop = entry
    let payout = 80
    let wins = 0
    let losses = 0
    let pair = ""
    orders.orderHistory.map(item => {
      if(item.account === choosed[0].account_name){
        if(item.result === "win") {
          wins += 1
        } else if (item.result === "loss"){
          losses += 1
        }
      }
    })
    setorder({balance, entry, take, stop, payout, wins, losses, consecutive_loss, max_loss, max_win, risk, pair, name})
  }

  function handleWin(e){
    if(order.pair !== ""){
    let {balance, entry, take, stop, payout, wins, losses, consecutive_loss, max_loss, max_win, risk, pair, name } = order;  
    balance += entry;
    balance = Math.round(balance *100)/100
    entry = Math.round((entry*1.8)*100)/100
    wins += 1
    dispatch(addOrder({
      date:localStorage.today,
      account: order.name,
      pair: order.pair,
      balance: balance,
      payout: order.payout,
      entry: order.entry,
      result:"win" 
    }))
    setorder({balance, entry, take, stop, payout, wins, losses, consecutive_loss, max_loss, max_win, risk, pair, name})} else {
      alert("please choose a pair first!")
    }
  }

  function handlePair(e){
    let {balance, entry, take, stop, payout, wins, losses, consecutive_loss, max_loss, max_win, risk, pair, name } = order;
    pair = e;
    setorder({balance, entry, take, stop, payout, wins, losses, consecutive_loss, max_loss, max_win, risk, pair, name})

  }

  function handleLoss(e){
    e.preventDefault()
    if(order.pair !== ""){
      let {balance, entry, take, stop, payout, wins, losses, consecutive_loss, max_loss, max_win, risk, pair, name } = order;  
      balance -= entry;
      balance = Math.round(balance *100)/100
      entry = Math.round((balance/10)*100)/100
      losses　+= 1;
      dispatch(addOrder({
        date:localStorage.today,
        account: order.name,
        pair: order.pair,
        balance: balance,
        payout: order.payout,
        entry: order.entry,
        result:"loss" 
      }))
      setorder({balance, entry, take, stop, payout, wins, losses, consecutive_loss, max_loss, max_win, risk, pair, name})
    } else {
      alert("please choose a pair first!")
    }
    
  }

  function handleSubmit(e){
    e.preventDefault();
    let {balance, entry, take, stop, payout, wins, losses, consecutive_loss, max_loss, max_win, risk, pair, name } = order;
    let params = {balance, entry, take, stop, payout, wins, losses, consecutive_loss, max_loss, max_win, risk, pair, name };
    alert("submit")
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.mainContent}>
        <form className={classes.form} noValidate>
            <h1 style={{margin:'0', marginBottom: '25px'}}>Trade</h1>
            <h1 style={{margin:'0', marginBottom: '25px'}}>Balance ${order.balance}</h1>
            <Grid item xs={12}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Choose account
                </InputLabel>
                <Select
                fullWidth
                name="account"
                label="Select Strategy"
                onChange = {setUpTrade}
                formControlProps={{ fullWidth: true }}
                >
                {/* Polulate whith strategy name and id */}
                {profile.data.accounts.map(account => 
                  <MenuItem value={account._id}>{account.account_name}</MenuItem>
                )} 
                </Select>
            </Grid>
            <DayLimit loss={order.stop} profit={order.take}/>
            <Grid spacing={2}>
              <TradeDropdown title='Pair' items={Assets} handlePair={handlePair}/>
              <Grid item xs={12}> 
              <TextField className={classes.input}
                  // onChange={handlingChange}
                  variant="outlined"
                  required
                  fullWidth
                  value={order.payout}
                  id="payout"
                  label="payout"
                  name="Payout"
              />
              </Grid> 
            </Grid>
            <Grid item xs={12}>
              <TextField className={classes.input}
                  // onChange={handlingChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="Entry"
                  label="Entry"
                  value={order.entry}
                  type="text"
                  id="Entry"
              />
            </Grid>
        {(order.wins === order.max_win || order.losses === order.max_loss)? 
          <Button
            onSubmit={handleSubmit}
            variant="contained"
            color="primary"
            className={classes.submit}
            value="close"
          >Close</Button> : 
          <Container>
            <Button
              onClick={handleWin}
              variant="contained"
              color="primary"
              className={classes.submit}
              value="win"
            > WIN </Button>
            <Button
              onClick={handleLoss}
              variant="contained"
              color="secondary"
              className={classes.submit}
            > LOSS </Button>
          </Container>
        }
        </form>
                </Container>
    
    </React.Fragment>
  );
}

