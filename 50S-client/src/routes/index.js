import React from 'react';
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
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
                <PublicRoute component={SignInSide} path="/" exact/>
                <Route>
                </Route>
            </Switch>
        </ConnectedRouter>
    )
}

export default Routes