import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  { apiCall } from '../../services/api'

const initialState = {
    call:null,
    orderHistory: []
}

export const setOrder = createAsyncThunk(
    'setOrder/add',
    async({action, path, input}) => {
        const response = apiCall("post", `${path}/api/auth/${action}`, input)
        .then(

        )
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orderHistory.push(action.payload)
        }
    },
    extraReducers:{
        [setOrder.pending]: (state) => {
            state.call = "pending"
        },
        [setOrder.fulfilled]: (state, {payload}) => {
            state.call = "successfull"
        },
        [setOrder.rejected]: (state, {error}) => {
            state.call="failed"
        }
    }
})


export const { addOrder } = orderSlice.actions

export default orderSlice.reducer