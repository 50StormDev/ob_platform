import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducers";
import { routerMiddleware } from 'connected-react-router';
import history from '../routes/history';

// configureStore by dafault has redux-thunk and compose 
const store =  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history))
})
export default store;