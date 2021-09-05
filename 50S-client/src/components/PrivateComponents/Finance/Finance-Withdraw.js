import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withdrawAccount } from '../../../store/reducers/Account';
import { unwrapResult } from '@reduxjs/toolkit';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { addError, removeError } from '../../../store/reducers/error';
import { Select } from '@material-ui/core';
import { MenuItem, InputLabel } from '@material-ui/core';
import { refreshAccount } from '../../../store/reducers/profileReducer';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  mainContent: {
    background: "white",
    opacity: "1",
    marginTop: "60px",
    padding: "57px"}
});

export default function Withdraw() {
  const classes = useStyles();
    const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const [info, setInfo] = useState({
    account: null,
    ammount: null,
    total_balance: 0
  })

  function handleChange(e){
    const { name, value } = e.target
    if(name==='account'){
      let total = profile.data.accounts.filter(item => item._id === value)
      console.log(total)
        setInfo(prev => {
      return {
        ...prev, 
        [name]: value,
      total_balance: total[0].balance
      };
    });
    }
    setInfo(prev => {
      return {
        ...prev, 
      [name]: value
      };
    });
  }

  function handleWithdraw(e){
    e.preventDefault()
    dispatch(withdrawAccount({
      path:"http://localhost:5000/account",
      profile_id: profile.data.id,
      account_id: info.account,
      ammount: info
    }))
    .then(unwrapResult).then(deposit => {
      setInfo({
        account: null,
        ammount:null,
        total_balance: deposit.total_balance
      })
      alert(deposit.res)
      dispatch(refreshAccount(deposit.refresh.accounts))
      dispatch(removeError())
    }).catch((error) => {
      alert(error.message)
      dispatch(addError(error))
    })
  }
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.mainContent}>
                    <form className={classes.form} noValidate>
                        <h1 style={{margin:'0', marginBottom: '25px'}}>Withdraw</h1>
                        <TextField className={classes.input}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="brooker"
                        label="Brooker"
                        name="brooker"
                        autoFocus
                        />
                        <Grid item xs={12}>
                          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Choose account
                          </InputLabel>
                          <Select
                            fullWidth
                            name="account"
                            label="Select Strategy"
                            onChange={handleChange}
                            formControlProps={{ fullWidth: true }}
                          >
                          {/* Polulate whith strategy name and id */}
                            {profile.data.accounts.map(account => 
                              <MenuItem value={account._id}>{account.account_name}</MenuItem>
                            )} 
                          </Select>
                        </Grid>
                        <TextField className={classes.input}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="ammount"
                        label="Amount"
                        type="text"
                        value={info.ammount}
                        onChange={handleChange}
                        />
                        <h3>Total Balance: ${info.total_balance}</h3>
                        <h3>Withdraw: ${info.ammount}</h3>
                        <h3>Remain:{ info.total_balance - info.ammount}</h3>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleWithdraw}
                        >
                        Withdraw
                        </Button>
                        <Grid container>
                        </Grid>
                    </form>
                </Container>
    </React.Fragment>
  );
}
