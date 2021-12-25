
import { useDispatch } from 'react-redux';
import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import { setAuthorization, hasAccess } from './../store/reducers/currentUser'
import { unwrapResult } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { getProfile, populate } from '../store/reducers/profileReducer'
import { push } from 'connected-react-router';
import { setStrategies } from '../store/reducers/strategyReducer'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import backImage from '../img/mountain1.jpg';

import Navbar from '../components/PrivateComponents/Main/Navbar'
import Copyright from '../components/PrivateComponents/Main/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage: `url(${backImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundPositionY: 'top',
    height:'100%',
    width: '100%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  }
}));

const PrivateRoute = ({component: Component, ...rest}) => {
    // when user is
    const classes = useStyles();
    const dispatch = useDispatch()
    let personalToken = localStorage.jwtToken;
    let path = window.location.pathname
    useEffect(() => {
        // Check localStorage for a token
        
        // if has a token setup user
        if (personalToken) {
        // Setup Authorization with that token
        setAuthorization(personalToken);
        // Prevent someone from manually tampering with the key of jwtToken in localStorage
        try {
            // populate the user id
            dispatch(hasAccess(jwtDecode(personalToken))).then(unwrapResult).then((user) => {
            dispatch(getProfile(user.id)).then(unwrapResult).then(profile => {
                dispatch(populate(profile.trading_profile[0]))
                dispatch(setStrategies(profile.strategyList))
            })
            })
        } catch (e) {
            dispatch(push("SignInSide"))
        }
        }
    }, [personalToken, path]);
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <div className={classes.root}>
            <CssBaseline />
            <Navbar/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Route {...rest} render={props => (
                    <Component {...props} />
                )} />
                <Copyright style={{color:"white"}}/>
            </main>
        </div>
        
    );
};

export default PrivateRoute;