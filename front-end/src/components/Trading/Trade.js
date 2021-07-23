import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

export default function Withdraw() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.mainContent}>
                    <form className={classes.form} noValidate>
                        <h1 style={{margin:'0', marginBottom: '25px'}}>Trade</h1>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <div>$ Profit</div>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                        <div>$ Stop Loss</div>
                        </Grid>
                        <InputLabel id="demo-controlled-open-select-label">Account</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            fullWidth
                            id="demo-controlled-open-select"
                            // open={open}
                            // onClose={handleClose}
                            // onOpen={handleOpen}
                            // value={age}
                            // onChange={handleChange}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
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
                        <Grid item xs={12}>

                        </Grid>
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
