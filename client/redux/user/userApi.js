import { apiSlice } from '../features/api/apiSlice';


export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include",
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-info",
        method: "PUT",
        body: {
          name,
        },
        credentials: "include",
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-users",
        method: "GET",
        credentials: "include",
      }),
    }),
    getUserImg: builder.query({
      query: (email) => ({
        url: "get-user-pic",
        method: "POST",
        body: {email},
        credentials: "include",
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user",
        method: "PUT",
        body: { email, role },
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateFundIDArray: builder.mutation({
      query: (id) => ({
        url: `update-user-fundArray`,
        body: {id},
        method: "PUT",
        credentials: "include",
      }),
    })
  }),
});

export const {
  useUpdateAvatarMutation,
  useGetUserImgQuery,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useUpdateFundIDArrayMutation
} = userApi;
