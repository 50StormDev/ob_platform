import React from 'react';
import SignInSide from './components/SingInSide';
import SignUp from './components/SingUp';
import Dashboard from './components/dashboard/Dashboard';
import Trading from './components/dashboard/Trading';
import Finance from './components/Finance/Finance';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Template from './components/Template';

function App () {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/Finance" component={Finance}/>
            <Route path="/Trading" component={Trading}/>
            <Route path="/SignUp" component={SignUp} />
            <Route path="/SignInSide" component={SignInSide} />
            <Route path='/Template' component={Template}/>
        </Switch>
    </ BrowserRouter>
    )};
export default App;
