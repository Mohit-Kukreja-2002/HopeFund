import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: 1,
    fundOfType : [],
    fundOfSearch : [],
    allFundsOfUrgency : [],
};

const fundSlice = createSlice({
    name: "fund",
    initialState,
    reducers: {
        fundRegistration: (state, action) => {
            state.active = action.payload.active;
        },
        fundByType : (state, action) => {
            state.fundOfType = action.payload.fundOfType;
        },
        fundBySearch : (state, action) => {
            state.fundOfSearch = action.payload.fundOfSearch;
        },
        allFundsByUrgency : (state, action) => {
            state.allFundsOfUrgency = action.payload.allFundsOfUrgency;
        },
    }
})

export const {fundRegistration,fundByType,fundBySearch,allFundsByUrgency} = fundSlice.actions;

export default fundSlice.reducer;