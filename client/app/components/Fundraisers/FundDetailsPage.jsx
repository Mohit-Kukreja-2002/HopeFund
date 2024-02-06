import { useGetFundDetailsQuery } from '../../../redux/fund/fundApi';
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Loader from "../Loader/loader";
import Heading from "../../utils/Heading";
import FundraiserDetail from "./FundraiserDetail";
import { useCreatePaymentIntentMutation, useGetStripePublishablekeyQuery } from "../../../redux/payment/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { paymentDone } from "../../../redux/payment/paymentSlice";
import { initializeApp } from "../../../redux/store";


const FundDetailsPage = ({ id }) => {
  initializeApp();
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false)
  const [stripePromise, setStripePromise] = useState(null);

  const { data: config } = useGetStripePublishablekeyQuery({});
  const { data, isLoading, refetch } = useGetFundDetailsQuery(id);
  const { paymentMade } = useSelector((state) => state.payment);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      refetch();
    }
  }, [isLoading,refetch])

  useEffect(() => {
    if (paymentMade && isClient) {
      toast.success("Thank You for your donation to this cause", {
        duration: 3000,
      });
      dispatch(paymentDone({ paymentMade: false }));
    }
  }, [isClient,dispatch,paymentMade]);

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
  }, [config]);

  return (
    <>
      {isClient && (isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.fundraiser?.fundraiserTitle.slice(0, 15) + ' - HopeFund'}
            description="HopeFund is a platform for helping people raise funds for any need from a community of rich-hearted individuals."
            keywords="Funding,HopeFund,Raise Money,Fundraiser"
          />
          <Navbar
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="mt-20">
            {/* Add content here */}
            {stripePromise && (
              <FundraiserDetail
                fund={data.fundraiser}
                stripePromise={stripePromise}
              />
            )}
          </div>
          <Footer />
        </div>
      ))}
    </>
  );

};

export default FundDetailsPage;
