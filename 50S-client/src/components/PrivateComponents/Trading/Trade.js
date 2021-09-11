import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DayLimit from './DayLimit';
import TradeDropdown from './TradeDropdown';
import Assets from '../../../assets';
import { MenuItem, Grid, InputLabel, Select } from '@material-ui/core';

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

  const profile = useSelector(state => state.profile)
  let account_list = profile.data.accounts
  console.log(account_list)
  // data for order 
  let balance = account_list[0].balance
  let entry = (balance / 10)
  let take = ((entry * 1.8) * 1.8) - entry
  let stop = entry
  let payout = 80

  
  const [order, setorder] = useState({
    balance: balance,
    entry: entry,
    take: take,
    stop: stop,
    payout: payout
  })
  
  
  console.log(order)
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.mainContent}>
        <form className={classes.form} noValidate>
            <h1 style={{margin:'0', marginBottom: '25px'}}>Trade</h1>
            <Grid item xs={12}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Choose account
                </InputLabel>
                <Select
                fullWidth
                name="account"
                label="Select Strategy"
                
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
              <TradeDropdown title='Pair' items={Assets}/>
              <Grid item xs={12}> 
              <TextField className={classes.input}
                  // onChange={handlingChange}
                  variant="outlined"
                  required
                  fullWidth
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

        <Button
            // onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            WIN
        </Button>
        <Button
            // onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submit}
        >
            LOSS
        </Button>
        </form>
                </Container>
    
    </React.Fragment>
  );
}
