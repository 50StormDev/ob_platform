import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import landingIMG from '../../img/login.jpg';
import Copyright from '../PrivateComponents/Main/Copyright';
import { setCurrentUser } from '../../store/reducers/currentUser';
import { populate } from '../../store/reducers/profileReducer'
import { addError, removeError } from '../../store/reducers/error';
import { setStrategies } from '../../store/reducers/strategyReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:  `url(${landingIMG})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundPositionY: 'top'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: '7px 15px 15px',
    background: "#d3d6d7",
    borderRadius: "3px",
  },
  backgroundSide: {
    background: '#353535',
    opacity: '0.9',
  },
  input: {
    background: '#E7E7E7'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "#4953b2"
  }
}));

// Setup the SignInSide component
export function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // instantiate the state
  const [info, setInfo] = useState({
    email: "lucia@lucia.com",
    password: "lucia"
  });

  // handle the input, by get the input and assign to the state
  function handleChange(e){
    const { name, value } = e.target;

    setInfo(prevInfo => {
      return {
        ...prevInfo,
        [name]: value
      };
    });
  }

  // handle the post request to the api
  function handleSubmit(e){
    e.preventDefault();
    dispatch(setCurrentUser({ 
      action: "signin", 
      path: "http://localhost:5000", 
      input: info
    }))
    .then(unwrapResult).then((response) => {
      try{ 
        dispatch(populate(response.foundTradingProfile))
        dispatch(setStrategies(response.strategies))
      } catch(e){console.log(e)}
      dispatch(removeError())
      dispatch(push("/Trading"))
    }).catch((error) => {
      alert(error.message)
      setInfo({email:"", password:""})
      dispatch(addError(error))
    })
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.backgroundSide}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={{color:"white", margin:"8px"}}>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={info.email}
              onChange={handleChange}
            />
            <TextField className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={info.password}
              onChange={handleChange}
            />
            <FormControlLabel className={classes.link}
              control={<Checkbox value="remember" color="primary" /> }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" className={classes.link}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2" className={classes.link}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright style={{color:"#424242"}}/>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignIn;