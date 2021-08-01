import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false, // when looged in change to true
    user: {} // all the user info when logged in
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                // turn empty object into false or if there are keys, true
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            };    
        default:
            return state;
    }
};

