'use client'
import { useRef, useState, useEffect } from "react";
import CircularProgressBar from "../../components/CircularProgressBar";
import Navbar from "../../components/Navbar";
import { BsWhatsapp, BsFacebook } from 'react-icons/bs';
import { FaHandsHelping } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/Footer";
import mongoose from 'mongoose'
import FundraiseRequests from "../../models/FundraiseRequests";
import { loadStripe } from '@stripe/stripe-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Heading from "@/app/utils/Heading";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const Post = ({ fund }) => {
    // const host = `${process.env.NEXT_PUBLIC_DEPLOYED}`;
    // const checkboxRef = useRef(null);
    // const ref = useRef(null)
    // const Router = useRouter();
    // const [updated, setUpdated] = useState(false);
    // const [isOpen, setIsOpen] = useState(false);
    // const [donationAmount, setDonationAmount] = useState('');
    // const [donationName, setDonationName] = useState('');
    // const [donationMail, setDonationMail] = useState('');
    // const [donationAnonymous, setDonationAnonymous] = useState(false);

    // const handleDonationAmountChange = (e) => {
    //     setDonationAmount(e.target.value);
    // }
    // const handleDonationNameChange = (e) => {
    //     setDonationName(e.target.value);
    // }
    // const handleDonationMailChange = (e) => {
    //     setDonationMail(e.target.value);
    // }
    // const handleDonationAnonymousChange = (e) => {
    //     setDonationAnonymous(checkboxRef.current.checked);
    // }

    // function openModal() {
    //     setIsOpen(true);
    // }

    // function closeModal() {
    //     setIsOpen(false);
    // }

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const element = ref.current;
    //         const distanceFromBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
    //         if (element) {
    //             if (distanceFromBottom <= 300) {
    //                 element.classList.remove('fixed');
    //             } else {
    //                 element.classList.add('fixed');
    //             }
    //         }
    //     };

    //     const processDonation = async () => {
    //         if (localStorage.getItem("paymentInitiated") === "true") {
    //             console.log("useEffect")
    //             toast.success('🦄 Thanks for contributing to this cause', {
    //                 position: "bottom-center",
    //                 autoClose: 2000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: false,
    //                 draggable: true,
    //                 theme: "dark",
    //             });
    //             localStorage.removeItem("paymentInitiated");

    //             const amount = localStorage.getItem("amount");
    //             const email = localStorage.getItem("email");
    //             const fundraiser = localStorage.getItem("fundraiser");
    //             const extension = localStorage.getItem("extension")
    //             console.log(email, fundraiser, amount)

    //             const findUser = async () => {
    //                 try {
    //                     console.log("findUser")
    //                     const response = await fetch(`${host}/api/findUser`, {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         },
    //                         body: JSON.stringify({ email }),
    //                     });
    //                     console.log("findUser12345")
    //                     const res = await response.json();
    //                     console.log("response in finduser", res)
    //                     if (!res.success) {
    //                         console.log("CreTAUser")
    //                         const response1 = await fetch(`${host}/api/auth/createUser`, {
    //                             method: 'POST',
    //                             headers: {
    //                                 'Content-Type': 'application/json',
    //                             },
    //                             body: JSON.stringify({ email, password: email })
    //                         });
    //                         const res1 = await response1.json();
    //                         console.log("response1 is here", res1);
    //                     }
    //                 } catch (error) {
    //                     console.log("Error in findUser:", error);
    //                 }
    //             }


    //             const updateUser = async () => {
    //                 console.log("UpdateUser")

    //                 const response = await fetch(`${host}/api/donationPush`, {
    //                     method: 'PUT',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({ amount: amount, email: email, fundraiser: fundraiser, extension: extension }),
    //                 });
    //                 console.log("updatedUser", response)
    //             }

    //             const updateProfile = async () => {
    //                 let donationAmount = localStorage.getItem("amount");
    //                 const response = await fetch(`${host}/api/updateFundraiser/${fundraiserDetails._id}`, {
    //                     method: 'PUT',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({ fundraiserDetails: fundraiserDetails._id, Amount: donationAmount })
    //                 });
    //                 console.log(response)
    //             }

    //             await findUser();
    //             await updateUser();
    //             await updateProfile();
    //             setUpdated(!updated);
    //             localStorage.removeItem("amount");
    //             localStorage.removeItem("email");
    //             localStorage.removeItem("fundraiser");
    //             localStorage.removeItem("extension");
    //             Router.push("/");
    //         }
    //     }

    //     processDonation();
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [isOpen, updated]);

    // const [storyUpdate, setstoryUpdate] = useState("story");

    // const initiatePayment = async () => {
    //     localStorage.setItem("amount", donationAmount)
    //     localStorage.setItem("email", donationMail)
    //     localStorage.setItem("fundraiser", fundraiserDetails.fundraiserTitle);
    //     localStorage.setItem("extension", fundraiserDetails.extension2);
    //     let final = fundraiserDetails.fundraiserTitle.replace(/\s+/g, "")
    //     console.log(final)

    //     const stripe = await stripePromise;
    //     const checkOutSession = await fetch(`${host}/api/preTransaction`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             email: fundraiserDetails.fundraiserTitle.replace(/\s+/g, "_"),
    //             amount: donationAmount,
    //             fundraiserTitle: final
    //         })
    //     });
    //     const checkOutSessionData = await checkOutSession.json();
    //     const result = await stripe.redirectToCheckout({
    //         sessionId: checkOutSessionData.id,
    //     })

    //     if (result.error) alert(result.error.message)
    // }

    // const handleSubmit = async () => {
    //     console.log("clicked")
    //     localStorage.setItem("paymentInitiated", "true");
    //     initiatePayment();
    // }

    return (
        <>
            {/* <Navbar navtype={"landing"} subpage={"donate"} /> */}
            <Heading
                    title={`${fund.fundraiserTitle}`}
                    description="HopeFund is a platform for helping people raise funds for any need from a community of rich hearted individuals."
                    keywords="Funding,HopeFund,Raise Money,Fundraiser"
                />
                <Navbar
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
            {/* <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            /> */}
            {fundraiserDetails &&
                <div className="flex my-[74px]">

                    {/* Left Box */}
                    <div className="w-[577px] ml-[15%]">
                        {/* Label */}
                        {fundraiserDetails && fundraiserDetails.verified &&
                            <div className="bg-[#f3f3f3] rounded-[0_0_4px_4px] text-[#212121] p-[10px] text-center text-[14px] w-full leading-[22px] ">
                                Hopefund will not charge any fee on your donation to this fundraiser.
                            </div>}
                        {fundraiserDetails && !fundraiserDetails.verified &&
                            <div className="bg-[#f05353] rounded-[0_0_4px_4px] text-[#212121] p-[10px] text-center text-[14px] w-full leading-[22px] ">
                                This cause is not yet verified.
                            </div>}

                        {/* Title */}
                        <div className="m-[20px_0_10px] text-[#212121] p-[3px_10px_10px]  pl-0 text-[24px] w-full leading-[33px] ">
                            {fundraiserDetails.fundraiserTitle}
                        </div>

                        {/* Image here */}
                        <div className="relative m-0">
                            <img className="w-[100%] rounded-lg" src={`/coverImg/${fundraiserDetails.fundraiserTitle}.${fundraiserDetails.extension2}`} alt="" />
                        </div>

                        {/* progess Bar  and etc */}
                        <div className='flex h-[90px] mt-4'>
                            <div>
                                <CircularProgressBar percentage={Math.ceil(100 * (fundraiserDetails.amountRaised / fundraiserDetails.amountRequired))} />
                            </div>
                            <div className='mt-4'>
                                <p className='text-[#5d5d5d] text-sm font-bold'>Raised</p>
                                <p className='mt-1'><span className="text-xl font-bold text-[#9c3353]">₹{fundraiserDetails.amountRaised}</span> out of ₹{fundraiserDetails.amountRequired}</p>
                            </div>
                            <div className='relative mt-5 ml-auto mr-2 text-[#691a47]'>
                                {fundraiserDetails.numberOfDonators === 0 &&
                                    <p onClick={() => { openModal() }} className="text-xl cursor-pointer bg-[#f3f3f3] p-[0_15px] leading-[40px] font-[500] underline rounded-2xl">Be the first Supporters</p>
                                }
                                {fundraiserDetails.numberOfDonators !== 0 &&
                                    <p p className="text-xl cursor-pointer bg-[#f3f3f3] p-[0_15px] leading-[40px] font-[500] underline rounded-2xl">{fundraiserDetails.numberOfDonators} Supporters</p>
                                }
                            </div>
                        </div>

                        {/* Share links */}
                        <div className="flex items-center justify-around mt-2 mb-6">
                            <div className="rounded-full flex w-2/5 bg-[#25d366] cursor-pointer py-2 justify-center items-center">
                                <BsWhatsapp size={30} className="text-white" />
                                <p className=" ml-4 text-[16px] text-white">Share</p>
                            </div>
                            <div className="rounded-full flex w-2/5 bg-[#3b5998] cursor-pointer py-2 justify-center items-center">
                                <BsFacebook size={30} className="text-white" />
                                <p className=" ml-4 text-[16px] text-white">Share</p>
                            </div>
                        </div>

                        {/* created by... */}
                        <div className="flex justify-start mb-8 tracking-wide">
                            <div className="p-2 flex w-[46%] rounded-[4px] border-[1px] border-solid border-[#e0e1e3] items-center justify-start ">
                                <p className="ml-3 relative bg-[#9c3353] text-[22px] rounded-full h-16 w-16 text-white after:absolute after:content-['V'] after:top-4 after:left-6 "></p>
                                <ul className="ml-4">
                                    <li className="text-sm text-[#5d5d5d]">Created by</li>
                                    <li className="text-[18px] font-[500] text-[#212121]">{fundraiserDetails.createdBy}</li>
                                </ul>
                            </div>
                            <div className="p-2 flex ml-4 right-0 w-[52%] rounded-[4px] border-[1px] border-solid border-[#e0e1e3] items-center justify-start ">
                                <p className="ml-3 relative bg-[#9c3353] text-[22px] rounded-full h-16 w-16 text-white after:absolute after:content-['V'] after:top-4 after:left-6 "></p>
                                <ul className="ml-4">
                                    <li className="text-sm mb-1 text-[#5d5d5d]">This fundraiser will benefit</li>
                                    <li className="text-[18px] mb-1 font-[500] text-[#212121]">{fundraiserDetails.benefitterName}</li>
                                    <li className="text-sm text-[#5d5d5d]">from {fundraiserDetails.benefitterAddress}</li>
                                </ul>
                            </div>
                        </div>

                        {/* Story Update handler */}
                        <div className="flex mb-6 text-center">
                            <button onClick={() => { setstoryUpdate("story") }} className={`w-full ${storyUpdate === "story" ? "font-bold text-white bg-[#9c3353] " : " text-[#212121] bg-white"} rounded-[30px_0_0_30px] text-[18px] border-[1px] border-solid border-[#9c3353] leading-[50px]`}>Story</button>
                            <button onClick={() => { setstoryUpdate("update") }} className={`w-full ${storyUpdate === "update" ? "font-bold text-white bg-[#9c3353] " : " text-[#212121] bg-white"} rounded-[0px_30px_30px_0px] text-[18px] border-[1px] border-solid border-[#9c3353] leading-[50px]`}>Update</button>
                        </div>

                        {/* Story */}
                        <div className="tracking-wider text-[#3a3a3a] leading-6">
                            <div dangerouslySetInnerHTML={{ __html: fundraiserDetails.fundraiserStory }}>
                                {/* {fundraiserDetails.fundraiserStory} */}
                            </div>
                        </div>

                        {/* Update */}

                        {/* Issue */}
                        <div className="text-center text-[#212121] rounded-[2px_20px] m-[60px_0] p-[20px] text-[16px] leading-[25px] shadow-[0_1px_6px_0_rgba(33,33,33,0.3)] ">
                            <p className="text-[16px]">If something isn't right, we will work with you to ensure no misuse occurs.</p>
                            <Link href={'/'} className="underline text-[#691a47]">Report this cause</Link>
                        </div>
                    </div>

                    {/* right box */}
                    <div ref={ref} className={`transition-transform duration-10000 fixed right-[10%] `}>
                        <div className="pt-3 mx-8 top-0 sticky w-[390px] bg-[#f7f7f7] shadow-[-7px_-2px_14px_0_rgba(150,51,83,0.28)]">
                            {/*Donate*/}
                            <div className="flex m-[0_30px] ">
                                <img className="w-[30px]" src="https://assets-give.milaap.org/assets/donate-icon-7cabb309d2c7a586a914c0a23abe52032aa0ce01115fb54e07c6148ab2cf8c6a.svg" alt="" />
                                <p className="mx-3 mt-auto text-[#212121] text-[18px] ">Donate</p>
                                <div className='relative mt-auto ml-auto text-[#691a47]'>
                                    <p className="text-xl cursor-pointer mt-auto p-[0_15px] leading-[40px] font-[500] underline">{fundraiserDetails.numberOfDonators} supporters</p>
                                </div>
                            </div>

                            <div className='flex m-[0_30px] h-[85px] my-3'>
                                <div>
                                    <CircularProgressBar size={16} percentage={Math.ceil(100 * (fundraiserDetails.amountRaised / fundraiserDetails.amountRequired))} />
                                </div>
                                <div className='mt-4 ml-5'>
                                    <p className='text-[#696969] text-[14px] font-bold'>Raised</p>
                                    <p className='mt-1 text-[17px]'><span className="text-xl font-[400] text-[#9c3353]">₹{fundraiserDetails.amountRaised}</span> out of ₹{fundraiserDetails.amountRequired}</p>
                                </div>
                            </div>

                            <div onClick={() => { openModal() }} className='cursor-pointer mx-auto w-[330px] text-center bg-[#9c3353] shadow-[0_0_6px_0_rgba(156,51,83,.2)] rounded-full hover:shadow-[0_3px_3px_0_rgba(0,0,0,.14),0_1px_7px_0_rgba(0,0,0,.12),0_3px_1px_-1px_rgba(0,0,0,.2)]' >
                                <p className='text-[#fff] text-xl leading-[50px]' >Donate Now</p>
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
                            <div onClick={() => { openModal() }} className="relative pb-[10px] text-center m-[20px_30px] flex justify-center ">
                                {/* <img src={'assets/Qrcode.jpg'} alt="" /> */}
                                <Image className="opacity-30 border-[1px] border-solid border-[#707070] p-[10px] " alt='Qrcode' width={170} height={170} src={"/assets/Qrcode.jpg"} />
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
                </div >
            }
            {isOpen &&
                <div className="fixed inset-0 z-10">
                    <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
                    <div className="relative mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg w-[570px]">
                        <div className="flex">
                            <h2 className="mb-4 mr-auto text-lg font-medium">Make a secure donation</h2>
                            <AiOutlineClose className="text-2xl text-gray-600 hover:cursor-pointer focus:outline-none" onClick={closeModal} />
                        </div>
                        <hr />
                        <div className="mt-4 px-4 mb-6 bg-[#691a47] py-5 text-white rounded-lg overflow-hidden grid grid-cols-12 gap-2">
                            <div className='col-span-0.5 text-2xl'>&#8377;</div>
                            <div className='relative col-span-11'>
                                <input value={donationAmount} onChange={handleDonationAmountChange} id="createdBy" type="donationAmount" name="createdBy" className=" bg-[#691a47] peer h-10 w-full border-b-2 border-white placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="name" />
                                <label htmlFor="donationAmount" className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">Amount</label>
                            </div>
                        </div>
                        <div className='space-y-8'>
                            <div className="relative ">
                                <input value={donationName} onChange={handleDonationNameChange} id="createdBy" type="name" name="donationName" className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-rose-600" placeholder="name" />
                                <label htmlFor="donationName" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
                            </div>
                            {/* <div className="relative mt-10">
                                <input value={donationPhone} onChange={handleDonationPhoneChange} id="email" name="donationPhone" type="number" className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-rose-600" placeholder="9876543210" />
                                <label htmlFor="donationPhone" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Phone no.</label>
                            </div> */}
                            <div className="relative mt-10">
                                <input value={donationMail} onChange={handleDonationMailChange} id="email" name="donationMail" type="text" className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-rose-600" placeholder="john@doe.com" />
                                <label htmlFor="donationMail" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Id</label>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                {/* <div className='text-base text-black'>Do you want to receive tax exemption receipt?</div>
                                <div>
                                    <div className="grid w-[12rem] grid-cols-2" x-data="app">
                                        <div>
                                            <input value={true} onChange={handleDonationTaxChange} type="radio" name="donationTax" id="Yes" className="hidden peer" checked />
                                            <label htmlFor="Yes" className="block p-2 text-center cursor-pointer select-none peer-checked:bg-green-500 peer-checked:font-bold peer-checked:text-white">Yes</label>
                                        </div>
                                        <div>
                                            <input value={false} onChange={handleDonationTaxChange} type="radio" name="donationTax" id="No" className="hidden peer" />
                                            <label htmlFor="No" className="block p-2 text-center cursor-pointer select-none peer-checked:bg-green-500 peer-checked:font-bold peer-checked:text-white">No</label>
                                        </div>
                                    </div>
                                </div> */}
                                <span className="p-0 text-base font-medium text-gray-700">Donate anonymously</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input onChange={handleDonationAnonymousChange} ref={checkboxRef} type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8d3868] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#691a47]"></div>
                                </label>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button onClick={handleSubmit} className='text-white text-xl py-1 px-20 rounded-3xl bg-[#691a47]' type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* </div> */}
            <Footer />
        </>
    );
}

// export async function getServerSideProps(context) {
//     if (!mongoose.connections[0].readystate) {
//         await mongoose.connect(process.env.MONGO_URI);
//     }

//     let fundraiserDetails = await FundraiseRequests.findOne({ slug: context.query.slug });

//     return {
//         props: { fundraiserDetails: JSON.parse(JSON.stringify(fundraiserDetails)) }, // will be passed to the page component as props
//     };
// }
// export default Post;