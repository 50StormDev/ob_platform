import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DayLimit from './DayLimit';
import TradeDropdown from './TradeDropdown';
import Assets from '../../../assets';


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
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.mainContent}>
        <form className={classes.form} noValidate>
            <h1 style={{margin:'0', marginBottom: '25px'}}>Trade</h1>
            <TradeDropdown title="Account" />
            <DayLimit/>
            <Grid spacing={2}>
              <TradeDropdown title='Pair' items={Assets.currencies}/>
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
