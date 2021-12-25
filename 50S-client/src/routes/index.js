import React from 'react';
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SignIn from '../components/PublicComponents/SingIn';
import SignUp from '../components/PublicComponents/SingUp';
import Main from '../components/PrivateComponents/Trading/Main'
import Finance from '../components/PrivateComponents/Finance/Finance';
import Profile from '../components/PrivateComponents/Profile/Profile';
import Dashboard from '../components/PrivateComponents/dashboard/Dashboard';
import Account from '../components/PrivateComponents/Account/Account';
import Brookers from '../components/PrivateComponents/Main/Brookers'
import Salary from "../components/PrivateComponents/Salary/Salary"
import history from './history';


function Routes() {
    return(
        <ConnectedRouter history={history}>
            <Switch>
                <PublicRoute component={SignIn} path="/SignInSide" exact/>
                <PublicRoute component={SignUp} path="/Signup" exact/>
                <PrivateRoute component={Brookers} path={"/Main"} />
                <PrivateRoute component={Main} path="/Trading" exact />
                <PrivateRoute component={Profile} path="/Profile" exact />
                <PrivateRoute component={Dashboard} path="/Dashboard" exact />
                <PrivateRoute component={Finance} path="/Finance" exact />
                <PrivateRoute component={Account} path="/Account" exact />
                <PrivateRoute component={Salary} path="/Salary" exact />
                <PublicRoute component={SignIn}/>
                <Route>
                </Route>
            </Switch>
        </ConnectedRouter>
    )
}

export default Routes