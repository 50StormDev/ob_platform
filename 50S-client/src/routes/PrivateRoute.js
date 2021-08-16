import React, { useEffect }from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const PrivateRoute = ({component: Component, ...rest}) => {
    // when user is
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.currentUser);
    useEffect(() => {
        if(!currentUser.isAuthenticated){
            dispatch(push("./SignInSide"))
        }
    },[dispatch])
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            <Component {...props} />
        )} />
    );
};

export default PrivateRoute;