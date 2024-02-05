import { apiSlice } from "../features/api/apiSlice";
import { paymentDone } from "./paymentSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getAllOrders: builder.query({
    //   query: (type) => ({
    //     url: `get-orders`,
    //     method: "GET",
    //     credentials: "include" as const,
    //   }),
    // }),
    getStripePublishablekey: builder.query({
      query: () => ({
        url: `payment/stripepublishablekey`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include",
      }),
    }),
    makePayment: builder.mutation({
      query: ({ email, fundId, payment_info, amount }) => ({
        url: "make-payment",
        body: {
          email,
          fundId,
          payment_info,
          amount
        },
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            paymentDone({
              paymentMade:true,
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
    }),
  }),
});

export const {
  // useGetAllOrdersQuery,
  useGetStripePublishablekeyQuery,
  useCreatePaymentIntentMutation,
  useMakePaymentMutation,
  // useCreateOrderMutation
} = ordersApi;
