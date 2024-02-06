import { apiSlice } from "../features/api/apiSlice";
import { fundByType, fundBySearch, fundRegistration, userFundArray, allFundsByUrgency, fundById, userDonationArray } from "./fundSlice";

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
                    // console.log(error);
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
        getUserFunds: builder.query({
            query: () => ({
                url: 'getUserCreatedFunds',
                method: "GET",
                credentials: "include",
            }),
        }),
        getUserDonations: builder.query({
            query: () => ({
                url: 'getUserDonatedFunds',
                method: "GET",
                credentials: "include",
            }),
        }),
        getFundsBySearch: builder.mutation({
            query: (search) => ({
                url: 'fundraiserBySearch',
                method: "POST",
                body: { search },
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        fundBySearch({
                            fundOfSearch: result.data.fundraisers,
                        })
                    );
                } catch (error) {
                    // console.log(error);
                }
            }
        }),
        getFundsByType: builder.mutation({
            query: (type) => ({
                url: 'fundraiserByType',
                method: "POST",
                body: { type },
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        fundByType({
                            fundOfType: result.data.fundraisers,
                        })
                    );
                } catch (error) {
                    // console.log(error);
                }
            }
        }),
        getAllFunds: builder.mutation({
            query: () => ({
                url: 'getAllFundsByUrgency',
                method: "GET",
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        allFundsByUrgency({
                            allFundsOfUrgency: result.data.fundraisers,
                        })
                    );
                } catch (error) {
                    // console.log(error);
                }
            }
        }),
        getFundDetails: builder.query({
            query: (id) => ({
                url: `get-fund/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),
    })
})

export const {
    useCreateFundRaiserMutation,
    useDeleteBenfitterImgMutation,
    useDeletCoverImgMutation,
    useAddBenfitterImgMutation,
    useAddCoverImgMutation,
    // useGetUserFundsMutation,
    useGetFundsByTypeMutation,
    useGetFundsBySearchMutation,
    useGetAllFundsMutation,
    useGetFundDetailsQuery,
    // useGetUserDonationsMutation,
    useGetUserDonationsQuery,
    useGetUserFundsQuery,
} = fundApi