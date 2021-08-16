import React, {useEffect, useRef}from 'react';
import { Redirect , Switch, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { setAuthorization, hasAccess, logout } from '../store/reducers/currentUser';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { getProfile } from '../store/reducers/profileReducer'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SignInSide from '../components/PublicComponents/SingInSide';
import SignUp from '../components/PublicComponents/SingUp';
import Main from '../components/PrivateComponents/Trading/Main'
import Finance from '../components/PrivateComponents/Finance/Finance';
import Profile from '../components/PrivateComponents/Profile/Profile';
import Dashboard from '../components/PrivateComponents/dashboard/Dashboard';
import Account from '../components/PrivateComponents/Account/Account';

import history from './history';


function Routes() {
    const dispatch = useDispatch()
    let personalToken = localStorage.jwtToken;
    const loadPage = useRef(false)
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
            dispatch(getProfile(user.id))
            dispatch(push("/Trading"))
            })
        } catch (e) {
            dispatch(logout())
        }
        }
    }, [personalToken]);
    return(
        <ConnectedRouter history={history}>
            <Switch>
                <PublicRoute component={SignInSide} path="/SignInSide" exact/>
                <PublicRoute component={SignUp} path="/Signup" exact/>
                <PrivateRoute component={Profile} path="/Profile" exact />
                <PrivateRoute component={Dashboard} path="/Dashboard" exact />
                <PrivateRoute component={Main} path="/Trading" exact />
                <PrivateRoute component={Finance} path="/Finance" exact />
                <PrivateRoute component={Account} path="/Account" exact />
                <Route>
                </Route>
            </Switch>
        </ConnectedRouter>
    )
}

export default Routes