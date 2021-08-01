import { combineReducers } from "redux";
import currentUsers from "./currentUser";
import errors from "./errors";

const rootReducers = combineReducers({
    currentUsers,
    errors
});

export default rootReducers;