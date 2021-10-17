import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import history from "../../routes/history";
import userReducer from "./currentUser";
import errorReducer from './error';
import profileReducer from './profileReducer';
import accountReducer from './Account'
import strategyReducer from './strategyReducer'
import orderReducer from './oderReducer'


const rootReducer = combineReducers({
    router: connectRouter(history),
    currentUser: userReducer,
    error: errorReducer,
    profile: profileReducer,
    account: accountReducer,
    strategyList: strategyReducer,
    orders: orderReducer
})
export default rootReducer;
