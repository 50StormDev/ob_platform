import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../services/api";

const initialState = {
    data:{ 
        account_name:null,
        balance: 0,
        lives: 0, 
        wins: 0,
        losses: 0,
        assertivity: 0,
        withdrawable: [],
        strategy:"",
        target:0,
        otc: {},
        trading_profile: "",
        brooker: "",
        orders:[]
    },
    path:"",
    request:""
}

export const createAccount = createAsyncThunk(
    'account/create',
    async({path, profile_id, brooker_id, input}) => {
        const response = apiCall("post", `${path}/account/${profile_id}/${brooker_id}/add`, input)
        return response    
    }
) 

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        changePath: (state, action) => {
            state.path = action 
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
        }
    }
})

export const {changePath} = accountSlice.actions
export default accountSlice.reducer