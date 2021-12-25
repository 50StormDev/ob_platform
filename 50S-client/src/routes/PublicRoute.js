
import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import { setAuthorization, hasAccess } from './../store/reducers/currentUser'
import { push } from 'connected-react-router';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getProfile, populate } from '../store/reducers/profileReducer'
import { changePath } from '../store/reducers/Account';


const PublicRoute = ({component: Component, ...rest}) => {
  const dispatch = useDispatch()
    let personalToken = localStorage.jwtToken;
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
                dispatch(changePath("PocketOption"))
            })
            dispatch(push("/Trading"))
            })
        } catch (e) {
            dispatch(push("SignInSide"))
        }
        }
    }, [dispatch, personalToken]);
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
          <Component {...props} />
      )} />
  );
};

export default PublicRoute;