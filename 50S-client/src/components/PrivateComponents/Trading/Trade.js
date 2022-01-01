import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DayLimit from './DayLimit';
import TradeDropdown from './TradeDropdown';
import Assets from '../../../assets';
import { MenuItem, Grid, InputLabel, Select, Divider } from '@material-ui/core';
import { addOrder } from '../../../store/reducers/oderReducer';
import { push } from 'connected-react-router';
var moment = require('moment')

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

  const [clockState, setClockState] = useState({now: ""});
  useEffect(() => {
    setInterval(() => {
      let now = new Date();
      let dnow = moment(new Date()).toObject()
      setClockState({now: now.toLocaleTimeString()})
    }, 1000)
  }, [])

  // get the account list to be display
  let account_list = profile.data.accounts

  const [order, setorder] = useState({
    name: "",
    pair: "",
    balance: 0,
    entry: 0,
    take: 0,
    stop: 0,
    payout: 0,
    wins:0,
    losses:0,
    consecutive_loss:0, 
    max_loss:0, 
    max_win:0, 
    risk:0
  })

  // function to assist to round the prices
  const round = (number) =>  {return Math.round(number * 100) / 100}

  // calculate soros
  const soros = (entry, payout, rep) => {
    let initial = entry
    for(let i = 0; i < rep; i++){
      entry = entry * ((payout / 100) + 1)
    }
    return round( entry - initial)
  }

  const classes = useStyles();
  
  // setup the initial state
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
    
    //setup the data to be place on the state
    let name = choosed[0].account_name
    let balance = choosed[0].balance
    let payout = 80
    let entry = (balance / risk)
    let take = soros(entry, payout, 2)
    let stop = entry
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
    setorder({
      balance, 
      entry, 
      take, 
      stop, 
      payout, 
      wins, 
      losses, 
      consecutive_loss, 
      max_loss, 
      max_win, 
      risk, 
      pair, 
      name
    })
  }

  // function to get the pair choosen by the user
  function handlePair(e){
    let {pair} = order;
    pair = e;
    setorder(prev => {
      return {
        ...prev,
        pair: pair
      }
    })
  }

  // function to handle win
  function handleWin(e){
    //check if the user has choosen a pair, if not display an alert to ask to choose a pair
    if(order.pair !== ""){
    let {balance, entry, wins, payout } = order; 
    balance += entry * (payout / 100);
    balance = round(balance)
    wins += 1 
    entry = round(entry + soros(entry, payout, wins))
    
    dispatch(addOrder({
      date:localStorage.today,
      account: order.name,
      pair: order.pair,
      balance: balance,
      payout: order.payout,
      entry: order.entry,
      result:"win" 
    }))
    setorder(prevInfo => {
      return {
        ...prevInfo,
        balance:balance,
        entry: entry,
        wins: wins
      };
    })} else {
      alert("please choose a pair first!")
    }
  }

  // function to handle the loss 
  function handleLoss(e){
    e.preventDefault()
    // check if the user has choosen a pair, if not display an alerto to ask to choose a pair
    if(order.pair !== ""){
      let {balance, entry,losses, pair} = order;  
      balance -= entry;
      balance = Math.round(balance *100)/100
      entry = Math.round((balance/10)*100)/100
      losses += 1;
      dispatch(addOrder({
        date:localStorage.today,
        account: order.name,
        pair: order.pair,
        balance: balance,
        payout: order.payout,
        entry: order.entry,
        result:"loss" 
      }))
      setorder(prevInfo => {
      return {
        ...prevInfo,
        pair: pair,
        balance: balance,
        entry: entry,
        losses: losses
      }}
    )
    } else {
      alert("please choose a pair first!")
    }
    
  }

  // handle api call 
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
          <Grid item xs={12} style={{display:'flex'}}>
              <h1 style={{margin:'0', marginBottom:'25px', padding: '0'}}>Trade</h1>
              <h2 style={{margin:'0', marginBottom:'25px', padding: '0'}}>{clockState.now}
              </h2>
            </Grid>
          <Grid
            style={{marginBottom: "20px"}}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={4}>
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
            <Grid item xs={6}>
              <h2 style={{margin:'0', padding: '0'}}>Balance ${order.balance}</h2>
              <DayLimit loss={order.stop} profit={order.take}/>
            </Grid>
          </Grid>
          <Divider/>
          {(order.wins === order.max_win || order.losses === order.max_loss)? 
            <Grid style={{marginTop: "30px"}}
              container
              direction="column"
              justifyContent="center"
              alignItems="center">
              <Grid item>
                <h2>Withdraw Time!!!</h2>
              </Grid>
              <Grid item>
                <h1>${order.take}</h1>
              </Grid>
              <Grid item>
                <Button
                onSubmit={handleSubmit}
                onClick={()=> {
                  window.open("https://pocketoption.com/en/cabinet/withdrawal/")
                  navigator.clipboard.writeText("MQqS2Y9CLSksLoAXQWSL1n1kspv7W8TVdR")
                  }}
                variant="contained"
                color="primary"
                value="close"
                >Close</Button>
              </Grid>
            </Grid>
            : 
            <Container style={{marginTop: "30px"}}>     
              <Grid 
                container 
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={4}
              >
                <Grid item xs={4}>
                  <TradeDropdown title='Pair' items={Assets} handlePair={handlePair}/>
                </Grid>
                <Grid item xs={4}> 
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
                <Grid item xs={4}>
                  <Button
                    onClick={() => {navigator.clipboard.writeText(order.entry)}}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    name="Entry"
                    label="Entry"
                    value={order.entry}
                  >{order.entry}</Button>
                </Grid>
              </Grid>
              <Grid 
                container 
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{marginTop: "30px"}}
              >
                <Grid item >
                  <Button onClick={handleWin} variant="contained" style={{ color:"white", backgroundColor:"green"}} size="large" value="win">
                    Win
                  </Button>
                </Grid>
                <Grid item >
                  <Button
                    onClick={handleLoss}
                    variant="contained"
                    color="secondary"
                    size="large"
                  > LOSS </Button>
                </Grid>
              
              
              </Grid>
              
            </Container>
          }
        </form><Button
                onClick={()=> {
                  dispatch(push("/Trade"))
                  }}
                variant="contained"
                color="primary"
                value="back"
                >Go Back</Button>
      </Container>
    </React.Fragment>
  );
}

