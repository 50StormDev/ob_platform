import React from 'react';
import SignInSide from './components/SingInSide';
import SignUp from './components/SingUp';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App () {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/SignInSide" component={SignInSide} />
        </Switch>
    </ BrowserRouter>
    )};
export default App;
