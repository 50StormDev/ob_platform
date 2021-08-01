import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    };
};

export function authUser(type, userData){
    return dispatch => {
        return new Promise((resolve, reject) => {
            // pass method, API URL, userData
            return apiCall("post", "http" ,userData).then(({ token, ...user }) => {
                localStorage.setItem("jwtToken", token);
                dispatch(setCurrentUser(user));
                resolve();
            })
        })
    }
}