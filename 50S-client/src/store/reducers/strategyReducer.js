import { createSlice } from "@reduxjs/toolkit";
// create a reducer to store the strategies
const initialState = {
    strategyList: []
}

const strategiesSlice = createSlice({
    name: 'strategyList',
    initialState,
    reducers: {
        setStrategies(state, action) {
            state.strategies = action.payload
        }
    }
})

export const { setStrategies } = strategiesSlice.actions
export default strategiesSlice.reducer