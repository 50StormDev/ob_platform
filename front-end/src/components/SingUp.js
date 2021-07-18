import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignUpImage from '../img/singup1.jpeg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Ob_Plaftorm
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#353535',
    opacity: '0.9',
    border: '1px solid #000000',
    boxSizing: 'border-box',
    borderRadius: '5px'
  },
  image: {
    backgroundImage:  `url(${SignUpImage})`,
    position: 'absolute',
    width: '100%',
    height: "100%",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundPositionY: 'top'
  },
  avatar: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    backgroundColor: '#0050b3',
    width: '55px',
    height: '55px'
  },
  title: {
    fontSize: 'xx-large',
    marginTop: '10px',
    color: 'white'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    padding: '30px'
  },
  input: {
    background: '#E7E7E7'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [newUser, setNewUser] = useState({
      ui_id:"",
      fName:"",
      lName:"",
      email:"",
      username:"",
      password:"",
      balance:0,
      totalWins:0,
      totalTrades:0,
      trandingProfit:0
  });

  function handlingChange(e){
    const { name, value } = e.target;

    setNewUser((prev) => ({
        ...prev,
        [name]: value
    }));
  }

  function handleSubmit(e){
    e.preventDefault();
    axios.post( "https://ob-platform-server.herokuapp.com/user/add", {newUser});
  }


  return (
    <div className={classes.image}>
      <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon style={{ fontSize: 40 }} className=".MuiIcon-fontSizeLarge"/>
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField className={classes.input}
                onChange={handlingChange}
                autoComplete="fname"
                name="fName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField className={classes.input}
                onChange={handlingChange}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField className={classes.input}
                onChange={handlingChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField className={classes.input}
                onChange={handlingChange}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField className={classes.input}
                onChange={handlingChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>

            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signInSide" variant="body2" style={{color:"white"}}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}