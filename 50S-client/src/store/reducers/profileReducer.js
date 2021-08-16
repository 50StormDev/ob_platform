import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCallGet } from "../../services/api";

const initialState = {
    data: {
    id: null,
    totalBalance: null,
    totalProfit: null,
    total_loss: null,
    total_win: null
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
    reducer:{
        populate: (state, action) => {
            state.data = action
            state.status = "fullfield"
        }
    },
    extraReducers:{
        [getProfile.pending]: (state) => {
            state.status = "pending"
        },
        [getProfile.fulfilled]: (state, {payload}) => {
            state.data = payload;
            state.status = "fullfield"
        }, 
        [getProfile.rejected]: (state) =>
        state.status = "failed"
    }
})

export const { populate } = routerSlice.actions

export default routerSlice.reducer