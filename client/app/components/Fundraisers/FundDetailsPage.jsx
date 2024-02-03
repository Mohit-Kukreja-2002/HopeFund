import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useGetFundDetailsQuery } from "@/redux/fund/fundApi";
import { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Loader from "../Loader/loader";
import Heading from "@/app/utils/Heading";
import FundraiserDetail from "./FundraiserDetail";


const FundDetailsPage = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetFundDetailsQuery(id);
  // const { data: config } = useGetStripePublishablekeyQuery({});
  // const [createPaymentIntent, { data: paymentIntentData }] =
  //   useCreatePaymentIntentMutation();
  const { data: userData } = useLoadUserQuery(undefined, {});
  // const [stripePromise, setStripePromise] = useState<any>(null);
  // const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   if (config) {
  //     const publishablekey = config?.publishablekey;
  //     setStripePromise(loadStripe(publishablekey));
  //   }
  //   if (data && userData?.user) {
  //     const amount = Math.round(data.course.price * 100);
  //     createPaymentIntent(amount);
  //   }
  // }, [config, data, userData]);

  // useEffect(() => {
  //   if (paymentIntentData) {
  //     setClientSecret(paymentIntentData?.client_secret);
  //   }
  // }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.fundraiser?.fundraiserTitle.slice(0, 15) + ' - HopeFund'}
            description="HopeFund is a platform for helping people raise funds for any need from a community of rich hearted individuals."
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
            <FundraiserDetail fund={data.fundraiser}/>
          </div>
          {/* {stripePromise && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          )} */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default FundDetailsPage;
