import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: null
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        addError(state, action) {
            state.message = action.payload
        },
        removeError(state) {
            state.message = null
        }
    }
})

export const { addError, removeError } = errorSlice.actions
export default errorSlice.reducer