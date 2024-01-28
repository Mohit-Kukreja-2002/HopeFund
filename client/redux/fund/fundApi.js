import { apiSlice } from "../features/api/apiSlice";

export const fundApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        deleteBenfitterImg : builder.mutation({
            query : (public_id) => ({
                url: 'deleteBenefitterImg',
                method: "POST",
                body: {public_id},
                credentials: "include",
            }),
        }),
        deletCoverImg : builder.mutation({
            query : (public_id) => ({
                url: 'deleteCoverImg',
                method: "POST",
                body: {public_id},
                credentials: "include",
            }),
        }),
        addBenfitterImg : builder.mutation({
            query : (avatar) => ({
                url: 'addBenefitterImg',
                method: "POST",
                body: {avatar},
                credentials: "include",
            }),
        }),
        addCoverImg : builder.mutation({
            query : (avatar) => ({
                url: 'addCoverImg',
                method: "POST",
                body: {avatar},
                credentials: "include",
            }),
        }),
    })
})

export const {
    useDeleteBenfitterImgMutation,
    useDeletCoverImgMutation,
    useAddBenfitterImgMutation,
    useAddCoverImgMutation,
} = fundApi