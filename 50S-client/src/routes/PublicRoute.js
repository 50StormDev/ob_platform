
import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import { setAuthorization, logout, hasAccess } from './../store/reducers/currentUser'
import { push } from 'connected-react-router';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

const PublicRoute = ({component: Component, ...rest}) => {
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
          <Component {...props} />
      )} />
  );
};

export default PublicRoute;