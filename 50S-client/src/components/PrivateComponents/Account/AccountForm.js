import React, { useState } from 'react';
import { changePath, createAccount } from '../../../store/reducers/Account';
import { addError, removeError } from '../../../store/reducers/error';
import { refreshAccount } from '../../../store/reducers/profileReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Select } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
  Slider,
  InputLabel
} from '@material-ui/core';
export default function AccountForm() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const strategyList = useSelector(state => state.strategyList)
  const [account, setAccount] = useState({
    account_name: "",
    target: 0,
    strategy: "",
    strategy_name: "",
    max_loss: 0,
    max_win: 0,
    consecutive_loss: 0,
    risk: 5
  })
  
  function handleChangeAccount(e){
    const {name, value} = e.target
    setAccount(prevInfo => {
      return {
        ...prevInfo,
        [name]: value
      };
    })
  }

  function handleRisk(event, newValue){
    setAccount(prevInfo => {
      return {
        ...prevInfo,
        risk: newValue
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
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
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
                  <MenuItem value="createStrategy" style={{backgroundColor:"green"}}>
                    Add Strategy
                  </MenuItem>
                </Select>
              </Grid>
              {(account.strategy === "createStrategy") &&  
                <React.Fragment>
                  <Divider/>
                  <Typography variant="h4" align="center" component="h1" gutterBottom>
                  Create Strategy
                  </Typography>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="strategy_name"
                      type="text"
                      label="Strategy Name"
                      onChange={handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="max_loss"
                      type="number"
                      label="Max Loss"
                      onChange={handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="max_win"
                      type="number"
                      label="Max Win"
                      onChange={handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="consecutive_loss"
                      type="number"
                      label="Consecutive Loss"
                      onChange={handleChangeAccount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                      <Typography id="discrete-slider" gutterBottom>
                          Risk {account.risk}%
                      </Typography>
                      <Slider
                        defaultValue={5}
                          aria-labelledby="discrete-slider"
                          valueLabelDisplay="auto"
                          name="risk"
                          step={1}
                          marks
                          min={1}
                          max={20}
                          onChange={handleRisk}
                      />
                  </Grid>

                </React.Fragment>
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

                // <Grid item>
                //   <FormControl component="fieldset">
                //     <FormLabel component="legend">Best Stooge</FormLabel>
                //     <RadioGroup row aria-label="gender" name="gender1" >
                //         <FormControlLabel value="female" control={<Radio />} label="Female" />
                //         <FormControlLabel value="male" control={<Radio />} label="Male" />
                //         <FormControlLabel value="other" control={<Radio />} label="Other" />
                //         <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                //     </RadioGroup>
                //   </FormControl>
                // </Grid>
                // <Grid item>
                //   <FormControl component="fieldset">
                //     <FormLabel component="legend">Sauces</FormLabel>
                //     <FormGroup row>
                //       <FormControlLabel
                //         label="Ketchup"
                //         control={
                //           <Field
                //             name="sauces"
                //             component={Checkbox}
                //             type="checkbox"
                //             value="ketchup"
                //           />
                //         }
                //       />
                //       <FormControlLabel
                //         label="Mustard"
                //         control={
                //           <Field
                //             name="sauces"
                //             component={Checkbox}
                //             type="checkbox"
                //             value="mustard"
                //           />
                //         }
                //       />
                //       <FormControlLabel
                //         label="Salsa"
                //         control={
                //           <Field
                //             name="sauces"
                //             component={Checkbox}
                //             type="checkbox"
                //             value="salsa"
                //           />
                //         }
                //       />
                //       <FormControlLabel
                //         label="Guacamole 🥑"
                //         control={
                //           <Field
                //             name="sauces"
                //             component={Checkbox}
                //             type="checkbox"
                //             value="guacamole"
                //           />
                //         }
                //       />
                //     </FormGroup>
                //   </FormControl>
                // </Grid>
                // <Grid item xs={12}>
                //   <Field
                //     fullWidth
                //     name="notes"
                //     component={TextField}
                //     multiline
                //     label="Notes"
                //   />
                // </Grid>