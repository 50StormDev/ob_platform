import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCallGet } from "../../services/api";

const initialState = {
    data: {
        id:"",
        withdraw_list:[],
        accounts:[],
        total_win: 0,
        total_loss: 0,
        totalBalance:0,
        totalProfit:0,
        notification:[],
        personal_account: null
    },
    status: ""
}

export const getProfile = createAsyncThunk(
    'user/profile',
    async(id) => {
        const response = apiCallGet(`http://localhost:5000/profile/${id}`)
        return response;
    }
)

const routerSlice = createSlice({
    name: 'router',
    initialState,
    reducers:{
        populate: (state, action) => {
            const { withdraw_list, accounts, total_win, total_loss, totalBalance, totalProfit, notification, personal_account} = action.payload
            
            state.data = {
                id: action.payload._id,
                accounts,
                withdraw_list, 
                total_win, 
                total_loss, 
                totalBalance, 
                totalProfit, 
                notification,
                personal_account
            }
            state.status = "fullfield"
        },
        refreshAccount: (state, action) => {
            state.data.accounts = action.payload
            state.status = "fullfied"
        }
    },
    extraReducers:{
        [getProfile.pending]: (state) => {
            state.status = "pending"
        },
        [getProfile.fulfilled]: (state, {payload}) => {
            state.data = payload.trading_profile[0];
            state.status = "fullfield"
        }, 
        [getProfile.rejected]: (state) =>
        state.status = "failed"
    }
})

export const { populate, refreshAccount } = routerSlice.actions

export default routerSlice.reducer