import { apiCall, setTokenHeader } from "../../services/api";
import { addError, removeError } from "./errors";
import store from '../reducers/index';
import { setAuthorization,  authUser} from "../reducers/currentUser";


// export function authUser(type, url, userData){

//     return dispatch => {
//         //wrap our thunk in a promise so we can wait for the API call
//         return new Promise((resolve, reject) => {
//             // pass method, API URL, userData
//             return apiCall("post", `${url}/api/auth/${type}`, userData).then(({ token, ...data }) => {
//                 localStorage.setItem("jwtToken", token); // save jwtToken in localStorage
//                 setAuthorization(token) //pass token to be placed to the header
//                 console.log(data);
//                 dispatch(user.actions.setCurrentUser(data)); //pass the object received from the API call 
//                 dispatch(removeError()) 
//                 resolve(); // indicate that the API call succeeded
//             })
//             .catch(err => {
//                 dispatch(addError(err.message)); // take the message sent by the server 
//                 reject();   // indicate the API call failed
//             })
//         })
//     }
// }