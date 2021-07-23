import React from 'react';
import SignInSide from './components/SingInSide';
import SignUp from './components/SingUp';
import Main from './components/Main';
import Finance from './components/Finance/Finance';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Template from './components/Main.js';

function App () {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/SignUp" component={SignUp} />
            <Route path="/SignInSide" component={SignInSide} />
            <Route path="/" exact={true} component={Main} />
            <Route path="/Finance" component={Finance}/>
            <Route path='/Trading' component={Template}/>
        </Switch>
    </ BrowserRouter>
    )};
export default App;
