import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: 1,
    funds: [],
};

const fundSlice = createSlice({
    name: "fund",
    initialState,
    reducers: {
        fundRegistration: (state, action) => {
            state.active = action.payload.active;
        },
        userFundArray : (state, action) => {
            state.funds = action.payload.funds;
        } 
    }
})

export const {fundRegistration,userFundArray} = fundSlice.actions;

export default fundSlice.reducer;