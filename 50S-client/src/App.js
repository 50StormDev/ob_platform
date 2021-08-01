import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import SignInSide from './components/SingInSide';
import SignUp from './components/SingUp';
import Main from './components/Main';
import Finance from './components/Finance/Finance';
import Profile from './components/Profile';
import Dashboard from './components/dashboard/Dashboard';
import Account from './components/Account';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const store = configureStore();

function App () {
  return (
      <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/SignUp" component={SignUp} />
                <Route path="/SignInSide" component={SignInSide} />
                <Route path="/Profile" component={Profile}/>
                <Route path="/Dashboard" component={Dashboard}/>
                <Route path="/" exact={true}>
                    <Redirect to="/Trading"/>
                </Route>
                <Route path="/Trading" exact={true} component={Main} />
                <Route path="/Finance" component={Finance}/>
                <Route path="/Finance" component={Finance}/>
                <Route path="/Account" component={Account}/>
            </Switch>
        </BrowserRouter>
      </Provider>
    
    )};
export default App;
