
import { useSelector, useDispatch } from 'react-redux';
import React, {useEffect, useRef} from 'react';
import { Route } from 'react-router-dom';
import { setAuthorization, logout, hasAccess } from './../store/reducers/currentUser'
import { unwrapResult } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { getProfile, populate } from '../store/reducers/profileReducer'
import { push } from 'connected-react-router';
import { setStrategies } from '../store/reducers/strategyReducer'
const PrivateRoute = ({component: Component, ...rest}) => {
    // when user is
    const dispatch = useDispatch()
    let personalToken = localStorage.jwtToken;
    let path = window.location.pathname
    const currentUser = useSelector((state) => state.currentUser);
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
        <Route {...rest} render={props => (
            <Component {...props} />
        )} />
    );
};

export default PrivateRoute;