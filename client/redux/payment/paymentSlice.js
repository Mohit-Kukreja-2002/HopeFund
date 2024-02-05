import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentMade: false
};

const paymentSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {
        paymentDone : (state,action) =>{
            state.paymentMade=action.payload.paymentMade
        }
    }
})

export const {
    paymentDone
} = paymentSlice.actions;

export default paymentSlice.reducer;