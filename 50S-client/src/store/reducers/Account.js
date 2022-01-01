import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../services/api";

const initialState = {
    data:{      
        notification: [],
        totalBalance: 0,
        totalProfit: 0,
        total_loss: 0,
        total_win: 0,
        accounts: [],
        withdraw_list: []

    },
    path:"",
    request:""
}


//calculate
// function life(balance){
//   if(balance <= 10){
//     if(balance < 1){
//       return count
//     }
//     count++
//     balance--
//     life(balance)
//   } else {
//   count++
//   balance = balance - (balance/10)
//   life(balance)
//   }
// }

export const getHistory = createAsyncThunk(
    'account/getHistory',
    async({path, profile_id}) => {
        const response = apiCall("get", `${path}/${profile_id}/history`)
        return response    
    }
) 

export const createAccount = createAsyncThunk(
    'account/create',
    async({path, profile_id, brooker_id, input}) => {
        const response = apiCall("post", `${path}/account/${profile_id}/${brooker_id}/add`, input)
        return response    
    }
) 

export const removeAccount = createAsyncThunk(
    'account/remove',
    async({path, profile_id ,account_id}) => {
        const response = apiCall("post", `${path}/${profile_id}/${account_id}/remove`)
        return response    
    }
) 

export const depositAccount = createAsyncThunk(
    'account/deposit',
    async({path, profile_id ,account_id, ammount}) => {
        const response = apiCall("post", `${path}/${profile_id}/${account_id}/deposit`, ammount)
        return response    
    }
) 

export const withdrawAccount = createAsyncThunk(
    'account/withdraw',
    async({path, profile_id ,account_id, ammount}) => {
        const response = apiCall("post", `${path}/${profile_id}/${account_id}/withdraw`, ammount)
        return response    
    }
) 

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        changePath: (state, action) => {
            state.path = action.payload
        }
    },
    extraReducers:{
        [createAccount.pending]:(state) => {
            state.request = "pending"
        },
        [createAccount.fullfield]: (state, {payload}) => {
            state.request = "fullfield"
            state.data = payload
        },
        [createAccount.reject]: (state) => {
            state.request = "rejected"
        },
        [removeAccount.pending]:(state) => {
            state.request = "pending"
        },
        [removeAccount.fullfield]: (state, {payload}) => {
            state.request = "fullfield"
            state.data = payload
        },
        [removeAccount.reject]: (state) => {
            state.request = "rejected"
        },
        [getHistory.pending]:(state) => {
            state.request = "pending"
        },
        [getHistory.fullfield]: (state, {payload}) => {
            state.request = "fullfield"
            state.data = payload
        },
        [getHistory.reject]: (state) => {
            state.request = "rejected"
        }
    }
})

export const {changePath} = accountSlice.actions
export default accountSlice.reducer