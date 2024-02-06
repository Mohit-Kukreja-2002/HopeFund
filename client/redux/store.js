"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice"
import authSlice from "./features/auth/authSlice";
import fundSlice from "./fund/fundSlice";
import paymentSlice from "./payment/paymentSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        fund: fundSlice,
        payment: paymentSlice,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

// call the load user function on every page load
export const initializeApp = async () => {
    // console.log("refreshing")
    await store.dispatch(
        apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
    );
    await store.dispatch(
        apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
    );
};

initializeApp();