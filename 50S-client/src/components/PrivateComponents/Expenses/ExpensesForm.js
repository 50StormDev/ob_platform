import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { depositAccount } from '../../../store/reducers/Account';
import { unwrapResult } from '@reduxjs/toolkit';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { addError, removeError } from '../../../store/reducers/error';
import { refreshAccount } from '../../../store/reducers/profileReducer';

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  mainContent: {
    background: "#ffff",
    opacity: "1",
    marginTop: "60px",
    padding: "35px",
    borderRadius: "10px"
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: '7px 15px 15px',
    borderRadius: "3px",
  },
  backgroundSide: {
    background: '#353535',
    opacity: '0.9',
  },
  input: {
    background: '#ffff'
  },
}));

// function to assist to round the prices
  const round = (number) =>  {return Math.round(number * 100) / 100}
  
export default function Deposits() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const [info, setInfo] = useState({
    thing: null,
    price: 0
  })

  function handleChange(e){
    const { name, value } = e.target
    if(name==='account'){
      let total = profile.data.accounts.filter(item => item._id === value)
        setInfo(prev => {
      return {
        ...prev,
        amount:0, 
        [name]: value,
      total_balance: total[0].balance
      };
    });
    }
    setInfo(prev => {
      return {
        ...prev, 
      [name]: value,
      
      };
    });
  }

  function handleDeposit(e){
    e.preventDefault()
    dispatch(depositAccount({
      path:"http://localhost:5000/account",
      profile_id: profile.data.id,
      account_id: info.account,
      amount: info
    }))
    .then(unwrapResult).then(deposit => {
      setInfo(prev => {
        return {
        account: prev.account,
        amount: 0,
        total_balance: deposit.total_balance
      }})
      dispatch(refreshAccount(deposit.refresh.accounts))
      dispatch(removeError())
    }).catch((error) => {
      alert(error.message)
      dispatch(addError(error))
    })
    
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.mainContent}>
        <form className={classes.form} noValidate>
          <h1 style={{margin:'0', marginBottom: '25px'}}>Deposit</h1>
          <Grid item xs={12}>
            <TextField
              label="With normal TextField"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              InputProps={{
                startAdornment: <InputAdornment position="start">kg</InputAdornment>,
              }}
            />
            <TextField className={classes.input}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="thing"
            label="Expense"
            type="text"
            value={info.amount}
            onChange={handleChange}
            />
          </Grid>
          
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleDeposit}
          >
          Deposit
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );
}
