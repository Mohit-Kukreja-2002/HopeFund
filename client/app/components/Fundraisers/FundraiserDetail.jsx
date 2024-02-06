import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CircularProgressBar from "../../utils/CircularProgressBar";
import { useGetUserImgQuery } from "../../../redux/user/userApi";
import Loader from "../Loader/loader";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useCreatePaymentIntentMutation } from "../../../redux/payment/paymentApi";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { initializeApp } from "../../../redux/store";

const coverImage = require('../../../public/assets/medical.jpg');
const userImage = require('../../../public/assets/user.png');

const FundraiserDetail = ({ fund, stripePromise }) => {

  // console.log("inside");
  // console.log(fund)
  // const { data: userData } = useLoadUserQuery(undefined, {});

  const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation();
  let [clientSecret, setClientSecret] = useState("");

  // console.log(fund.creatorMail)
  const { data, isLoading } = useGetUserImgQuery(fund.creatorMail);
  const ref = useRef(null)
  // const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(500);
  const [open1, setOpen1] = useState(false);

  const handleOrder = (e) => {
    initializeApp();
    setOpen(true);
  };
  const handleOrder1 = async (e) => {
    setOpen(false);
    setOpen1(true);
    const amount = Math.round(Number(donationAmount));
    let res = await createPaymentIntent(amount);
    if (res.data?.success) {
      setClientSecret(res.data?.client_secret);
    }
  };
  return (
    <>
      {
        isLoading
          ? (<Loader />)
          : (fund &&
            <>
              <div className="flex">

                {/* Left Box */}
                <div className="mx-auto 400px:w-[380px] 500px:w-[500px] 600px:w-[550px] 1100px:w-[500px] 1200px:w-[550px] 1400px:w-[650px] 1100px:ml-[100px] 1400px:ml-[200px] 1200px:ml-[130px] 1300px:ml-[200px] 1500px:ml-[240px]">
                  {/* Label */}
                  {fund.verified &&
                    <div className="bg-[#f3f3f3] rounded-[0_0_4px_4px] text-[#212121] p-[10px] text-center text-[14px] w-full leading-[22px] ">
                      Hopefund will not charge any fee on your donation to this fundraiser.
                    </div>}
                  {!fund.verified &&
                    <div className="bg-[#f05353] rounded-[0_0_4px_4px] text-[#212121] p-[10px] text-center text-[14px] w-full leading-[22px] ">
                      This cause is not yet verified.
                    </div>}

                  {/* Title */}
                  <div className="m-[20px_0_10px] text-[#212121] p-[3px_10px_10px] text-center pl-0 text-[24px] w-full leading-[33px] ">
                    {fund.fundraiserTitle}
                  </div>

                  {/* Image here */}
                  <div className="mx-5">
                    <Image
                      priority
                      className="w-full rounded-lg"
                      src={fund?.coverImg?.url || coverImage}
                      width={100}
                      height={100}
                      alt=""
                    />
                  </div>

                  {/* progess Bar  and etc */}
                  <div className='flex flex-col mx-auto mt-2 500px:mx-5 500px:flex-row'>
                    <div className="flex justify-center">
                      <div>
                        <CircularProgressBar percentage={
                          (Math.ceil(100 * (fund.amountRaised / fund.amountRequired)) <= 100)
                            ? Math.ceil(100 * (fund.amountRaised / fund.amountRequired))
                            : 100} />
                      </div>
                      <div className='my-auto'>
                        <p className='text-[#5d5d5d] text-sm font-bold'>Raised</p>
                        <p className='mt-1'><span className="text-xl font-bold text-[#9c3353]">₹{fund.amountRaised}</span> out of ₹{fund.amountRequired}</p>
                      </div>
                    </div>
                    <div className='flex justify-center my-auto 500px:ml-auto mr-2 text-[#691a47]'>
                      {fund.numberOfDonators === 0 &&
                        <p onClick={handleOrder} className="text-xl cursor-pointer bg-[#f3f3f3] p-[0_15px] leading-[40px] font-[500] underline rounded-2xl">Be the first Supporters</p>
                      }
                      {fund.numberOfDonators !== 0 &&
                        <p className="text-xl cursor-pointer bg-[#f3f3f3] p-[0_15px] leading-[40px] font-[500] underline rounded-2xl">{fund.numberOfDonators} Supporters</p>
                      }
                    </div>
                  </div>

                  <div className="flex justify-center my-6 text-center 1100px:hidden">
                    <div onClick={handleOrder} className={`w-[50%] font-bold text-white bg-[#9c3353] rounded-[30px] text-[18px] border-[1px] border-solid border-[#9c3353] leading-[50px]`}>Donate Now</div>
                  </div>

                  {/* created by... */}
                  <div className="flex flex-col justify-center my-4 tracking-wide 600px:mx-5 600px:flex-row 600px:justify-start">
                    <div className="p-2 flex w-[100%] mb-3 600px:mb-0 600px:w-[46%] rounded-[4px] border-[1px] border-solid border-[#e0e1e3] items-center justify-start">
                      <Image
                        priority
                        alt=""
                        className="w-12 h-12 rounded-full bg-[#9c3353]"
                        src={data?.userPic || userImage}
                        width={100} height={100} />
                      <ul className="ml-4">
                        <li className="text-sm text-[#5d5d5d]">Created by</li>
                        <li className="text-[18px] font-[500] text-[#212121]">{fund.createdBy}</li>
                      </ul>
                    </div>
                    <div className="p-2 flex 600px:ml-4 right-0 w-[100%] 600px:w-[52%] rounded-[4px] border-[1px] border-solid border-[#e0e1e3] items-center justify-start ">
                      <Image
                        priority
                        alt=""
                        className="w-12 h-12 rounded-full bg-[#9c3353]"
                        src={fund?.benefitterCreatorRelation === "myself" ? data?.userPic || userImage : (fund?.benefitterImg?.url || userImage)}
                        width={100} height={100} />
                      <ul className="ml-4">
                        <li className="text-sm mb-1 text-[#5d5d5d]">This fundraiser will benefit</li>
                        <li className="text-[18px] mb-1 font-[500] text-[#212121]">{fund.benefitterName}</li>
                        <li className="text-sm text-[#5d5d5d]">from {fund.benefitterAddress}</li>
                      </ul>
                    </div>
                  </div>

                  {/* Story Update handler */}
                  <div className="hidden mx-5 mb-6 text-center 1100px:flex">
                    <div className={`w-full font-bold text-white bg-[#9c3353] rounded-[30px] text-[18px] border-[1px] border-solid border-[#9c3353] leading-[50px]`}>Story</div>
                  </div>

                  {/* Story */}
                  <div className="500px:mx-5 p-[20px] tracking-wider rounded-[2px_20px] shadow-[0_1px_6px_0_rgba(33,33,33,0.3)] text-[#3a3a3a] leading-6">
                    <div className="block mb-2 text-xl font-bold 1100px:hidden">Story: </div>
                    <div dangerouslySetInnerHTML={{ __html: fund.fundraiserStory }}>
                    </div>
                  </div>

                  {/* Issue */}
                  <div className="mx-5 text-center text-[#212121] rounded-[2px_20px] m-[60px_0] p-[20px] text-[16px] leading-[25px] shadow-[0_1px_6px_0_rgba(33,33,33,0.3)] ">
                    <p className="text-[16px]">If something isn't right, we will work with you to ensure no misuse occurs.</p>
                    <Link href={'/'} className="underline text-[#691a47]">Report this cause</Link>
                  </div>
                </div>


                {/* right box */}
                <div ref={ref} className={`hidden 1100px:block 1100px:transition-transform 1100px:duration-10000 1100px:fixed  1100px:right-[70px] 1200px:right-[120px] 1400px:right-[130px] 1500px:right-[180px] `}>
                  <div className="pt-3 mx-8 top-0 sticky w-[390px] bg-[#f7f7f7] shadow-[-7px_-2px_14px_0_rgba(150,51,83,0.28)]">
                    {/*Donate*/}
                    <div className="flex m-[0_30px] ">
                      <img className="w-[30px]" src="https://assets-give.milaap.org/assets/donate-icon-7cabb309d2c7a586a914c0a23abe52032aa0ce01115fb54e07c6148ab2cf8c6a.svg" alt="" />
                      <p className="mx-3 mt-auto text-[#212121] text-[18px] ">Donate</p>
                      <div className='relative mt-auto ml-auto text-[#691a47]'>
                        <p className="text-xl cursor-pointer mt-auto p-[0_15px] leading-[40px] font-[500] underline">{fund.numberOfDonators} supporters</p>
                      </div>
                    </div>

                    <div className='flex m-[0_30px] h-[85px] my-3'>
                      <div>
                        <CircularProgressBar size={16} percentage={
                          (Math.ceil(100 * (fund.amountRaised / fund.amountRequired)) <= 100)
                            ? Math.ceil(100 * (fund.amountRaised / fund.amountRequired))
                            : 100} />
                      </div>
                      <div className='mt-4 ml-5'>
                        <p className='text-[#696969] text-[14px] font-bold'>Raised</p>
                        <p className='mt-1 text-[17px]'><span className="text-xl font-[400] text-[#9c3353]">₹{fund.amountRaised}</span> out of ₹{fund.amountRequired}</p>
                      </div>
                    </div>

                    <div
                      onClick={handleOrder}
                      className='cursor-pointer mx-auto w-[330px] text-center bg-[#9c3353] shadow-[0_0_6px_0_rgba(156,51,83,.2)] rounded-full hover:shadow-[0_3px_3px_0_rgba(0,0,0,.14),0_1px_7px_0_rgba(0,0,0,.12),0_3px_1px_-1px_rgba(0,0,0,.2)]' >
                      <p onClick={handleOrder} className='text-[#fff] text-xl leading-[50px]' >Donate Now</p>
                    </div>

                    <div className="text-[#5d5d5d] leading-[21px] m-[0_30px] text-center my-[12px] text-[14px]">
                      Card, Netbanking, Cheque pickups
                    </div>

                    <div className="m-[0_30px] relative text-center text-[#5d5d5d]">
                      <p className="before:absolute before:content-[''] before:border-[#691a47] before:top-[10px] before:left-8 before:w-[20%] before:h-[5px] before:border-t-[2px] before:border-solid after:absolute after:content-[''] after:border-[#691a47] after:top-[10px] after:right-8 after:w-[20%] after:h-[5px] after:border-t-[2px] after:border-solid">
                        Or <span className="text-[#9c3353] font-semibold ">Donate Using</span>
                      </p>
                    </div>

                    {/* Qr Box */}
                    <div onClick={handleOrder} className="relative pb-[10px] text-center m-[20px_30px] flex justify-center ">
                      <Image className="opacity-30 border-[1px] border-solid border-[#707070] p-[10px] " alt='Qrcode' width={170} priority height={170} src={"/assets/Qrcode.jpg"} />
                      <p className="cursor-pointer h-[30px] top-[70px] absolute bg-white  border-[1px] border-solid border-[#9c3353] leading-[24px] p-[3px_0] text-[#9c3353] rounded-[25px] shadow-[0_0_6px_0_rgba(156,51,83,.2)] tracking-wider w-[160px] hover:shadow-[0_3px_3px_0_rgba(0,0,0,.14),0_1px_7px_0_rgba(0,0,0,.12),0_3px_1px_-1px_rgba(0,0,0,.2)]">Generate Qr</p>
                    </div>

                    <div className="py-3 text-center bg-white">
                      <p className="text-[#5d5d5d]">Scan and donate with any app</p>
                      <ul className="flex mt-2 mx-[30px] justify-between">
                        <li>
                          <Image src={'/assets/bhim.png'} className="object-contain rounded-full border-solid border-[4px] border-[#feaf6b] " alt="/" width={40} height={40} />
                        </li>
                        <li>
                          <Image src={'/assets/gpay.png'} className="object-contain rounded-full border-solid border-[4px] border-[#d3d7fb] " alt="/" width={40} height={40} />
                        </li>
                        <li>
                          <Image src={'/assets/paytm.png'} className="object-contain rounded-full border-solid border-[4px] border-[#67d5f5] " alt="/" width={40} height={40} />
                        </li>
                        <li>
                          <Image src={'/assets/phonepe.png'} className="object-contain rounded-full border-solid border-[4px] border-[#c2b0e2] " alt="/" width={40} height={40} />
                        </li>
                        <li>
                          <Image src={'/assets/paypal.png'} className="object-contain rounded-full border-solid border-[4px] border-[#ffdba6] " alt="/" width={40} height={40} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {
                open &&
                <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
                  <div className="w-[350px] bg-white rounded-xl shadow p-3">
                    <div className="flex justify-end w-full">
                      <IoMdCloseCircleOutline
                        size={40}
                        className="text-black cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </div>
                    <div className="text-xl">Enter the amount to donate: </div>
                    <div className="mt-4 px-4 mb-6 bg-[#691a47] py-5 text-white rounded-lg overflow-hidden grid grid-cols-12 gap-2">
                      <div className='col-span-0.5 text-2xl'>&#8377;</div>
                      <div className='relative col-span-11'>
                        <input value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} id="createdBy" type="donationAmount" name="createdBy" className=" bg-[#691a47] peer h-10 w-full border-b-2 border-white placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="name" />
                        {donationAmount < 50 &&
                          <span className="block pt-2 text-red-500" >Minimum donation amount is &#8377;50</span>
                        }
                        {/* <label htmlFor="donationAmount" className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">Amount</label> */}
                      </div>
                    </div>
                    {donationAmount >= 50 &&
                      // <span>Minimum donation amount is &#8377;50</span>
                      <div onClick={handleOrder1} className="flex flex-row justify-center items-center py-3 px-6 rounded-full text-white cursor-pointer bg-[#691a47] min-h-[45px] text-[16px] font-Poppins font-semibold mt-2 !h-[35px]">
                        Continue
                      </div>
                    }{donationAmount < 50 &&
                      <div className="flex flex-row justify-center items-center py-3 px-6 rounded-full text-white cursor-pointer bg-[#691a47] min-h-[45px] text-[16px] font-Poppins font-semibold mt-2 !h-[35px]">
                        Continue
                      </div>
                    }
                  </div>
                </div>
              }
              {open1 && (
                <div className="z-[10000000000000000] w-full h-screen bg-[#00000036] fixed top-0 left-0 flex items-center justify-center">
                  <div className="w-[500px] bg-white rounded-xl shadow p-3">
                    <div className="flex justify-end w-full">
                      <IoMdCloseCircleOutline
                        size={40}
                        className="text-black cursor-pointer"
                        onClick={() => setOpen1(false)}
                      />
                    </div>
                    <div className="w-full">
                      {stripePromise && clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                          <CheckOutForm amount={donationAmount} fund={fund} />
                        </Elements>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )
      }
    </>
  );
}

export default FundraiserDetail