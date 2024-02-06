// import { styles } from "@/app/styles/style";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { useMakePaymentMutation } from "../../../redux/payment/paymentApi";
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe, } from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
// import socketIO from "socket.io-client";
// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

// type Props = {
//     setOpen: any;
//     data: any;
//     user: any;
//     refetch: any;
// };

const CheckOutForm = ({ fund, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [makePayment, { data: paymentData, error }] = useMakePaymentMutation();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email)
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });
        // console.log("error: ", error);
        // console.log("paymepaymentIntent: ", paymentIntent);
        if (error) {
            setMessage(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // console.log("here");
            setIsLoading(false);
            makePayment({ email, amount, fundId: fund._id, payment_info: paymentIntent });
        }
    };

    useEffect(() => {
        if (paymentData) {
            redirect(`/fundraiser/${fund._id}`);
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error;
                toast.error(errorMessage.data.message);
            }
        }
    }, [paymentData, error,fund._id])


    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text" className="flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#9c3353] hover:text-white min-h-[45px] w-full text-[16px] font-Poppins font-semibold mt-2 !h-[35px]">
                    {isLoading ? "Paying..." : "Pay now"}
                </span>
            </button>

            {/* Show any error or success messages */}
            {message && (
                <div id="payment-message" className="text-[red] font-Poppins pt-2">
                    {message}
                </div>
            )}
        </form>
    );
};

export default CheckOutForm;
