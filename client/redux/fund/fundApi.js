import { apiSlice } from "../features/api/apiSlice";
import { fundRegistration, userFundArray } from "./fundSlice";

export const fundApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createFundRaiser: builder.mutation({
            query: (data) => ({
                url: 'createFundraiser',
                method: 'POST',
                body: { data },
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        fundRegistration({
                            active: 2,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        deleteBenfitterImg: builder.mutation({
            query: (public_id) => ({
                url: 'deleteBenefitterImg',
                method: "POST",
                body: { public_id },
                credentials: "include",
            }),
        }),
        deletCoverImg: builder.mutation({
            query: (public_id) => ({
                url: 'deleteCoverImg',
                method: "POST",
                body: { public_id },
                credentials: "include",
            }),
        }),
        addBenfitterImg: builder.mutation({
            query: (avatar) => ({
                url: 'addBenefitterImg',
                method: "POST",
                body: { avatar },
                credentials: "include",
            }),
        }),
        addCoverImg: builder.mutation({
            query: (avatar) => ({
                url: 'addCoverImg',
                method: "POST",
                body: { avatar },
                credentials: "include",
            }),
        }),
        getUserFunds: builder.mutation({
            query: (createdFunds) =>({
                url: 'getUserCreatedFunds',
                method: "POST",
                body: { createdFunds },
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userFundArray({
                            funds: result.data.resArray,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        }),
    })
})

export const {
    useCreateFundRaiserMutation,
    useDeleteBenfitterImgMutation,
    useDeletCoverImgMutation,
    useAddBenfitterImgMutation,
    useAddCoverImgMutation,
    useGetUserFundsMutation,
} = fundApi