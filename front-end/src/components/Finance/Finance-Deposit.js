import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function preventDefault(event) {
  event.preventDefault();
}

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

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.mainContent}>
                    <form className={classes.form} noValidate>
                        <h1 style={{margin:'0', marginBottom: '25px'}}>Deposit</h1>
                        <TextField className={classes.input}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="account"
                        label="Account"
                        name="account"
                        autoFocus
                        />
                        <TextField className={classes.input}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Amount"
                        label="Amount"
                        type="text"
                        id="Amount"
                        />
                        <h3>Deposit: $100</h3>
                        <h3>Total Balance: $1100</h3>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                        Deposit
                        </Button>
                        <Grid container>
                        </Grid>
                    </form>
                </Container>
    </React.Fragment>
  );
}
