import { apiSlice } from "../features/api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        contactUs: builder.mutation({
            query: ({ name,email,message }) => ({
                url: "contact",
                method: "POST",
                body: {name,email,message},
                credentials: "include",
            }),
        }),
    })

})

export const {useContactUsMutation}= contactApi;
