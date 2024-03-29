import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall, setTokenHeader } from "../../services/api";
const initialState = {
    isAuthenticated: false, // credential
    brooker:"PocketOption",
    entryTime: "",
    user: {},   // user data
    call: null, // status of api request
    notification: [], //message and read
    withdraw_list:[] // list of brookers avaiavle for withdraw
}

function setTime(){
    new Date().toLocaleString()
    return 
}
// set the authoriation token to the header
export function setAuthorization(token) {
    setTokenHeader(token);
}

export const setCurrentUser = createAsyncThunk(
    'currentUser/setCurrentUser',
    async({action, path, input}) => {
        const response = apiCall("post", `${path}/api/auth/${action}`, input)
        .then(
            ({token, today, ...data}) => {
                localStorage.setItem("jwtToken", token);
                localStorage.setItem("today", today)
                setAuthorization(token);
                return data
            })
        return response    
    }
) 

export const hasAccess = createAsyncThunk(
    'user/hasAccess',
    async(user) => { 
        return user
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBrooker: (state, action) => {
            state.brooker = action.payload
        }
    },
    extraReducers: {
        [setCurrentUser.pending]: (state) => {
           state.call = "pending"
        },
        [setCurrentUser.fulfilled]: (state, {payload}) => {
            state.isAuthenticated = true
            state.call = "successfull" 
        },
        [setCurrentUser.rejected]: (state, {error}) => {
            state.isAuthenticated = false
            state.user = {}
            state.call = "failed"
        },
        [hasAccess.fulfilled]: (state, {payload}) => {
            state.isAuthenticated = true
            state.entryTime = setTime()
            state.user = payload
        }
    }
    
});

export const { setBrooker } = userSlice.actions

export const currentUserSelector = state => state.user
export default userSlice.reducer;