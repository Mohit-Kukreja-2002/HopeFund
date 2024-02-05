'use client'
// import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
// import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
// import img1 from '../../../public/assests/banner-img-1.png'


const Hero = () => {
    return (
        <>
            <div className="flex flex-col-reverse w-full overflow-hidden 1000px:flex-row">
                {/* <div className="absolute top-[100px] 1000px:top-[100px] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div> */}
                <div className="pt-[10px] 1000px:w-[50%] 1000px:pt-[0] z-10 overflow-hidden">
                    <div className='text-center 1000px:text-left 1500px:w-[65%] 1100px:w-[85%] w-[90%] mx-auto 1100px:mr-[-30px] 1200px:mr-[-60px] mt-0 1000px:mt-[100px]'>
                        <div>
                            <h1 className='font-[500] text-[48px] text-[#212121]'>HopeFund</h1>
                            <p className='text-[#5d5d5d] font-[500] text-md 1000px:ml-[90px]'>Your Generosity Creates Hope.</p>
                        </div>
                        <div>
                            <h3 className='mt-12 text-[22px] text-[#414040]'>Free Crowdfunding For India</h3>
                        </div>
                        <div className='text-[#5d5d5d] font-[400] text-[16px] mt-2'>Raise funds online for medical emergencies and social causes</div>
                        <div className='mx-auto 1000px:mr-0 1000px:ml-0 flex justify-center items-center my-6 w-[313px] h-[50px] rounded-3xl text-[20px] p-4 font-[500] bg-[#9c3353] hover:bg-[#b8355c] text-white'>
                            <Link href={'/createFund'}>Start a fundraiser - its FREE</Link>
                        </div>
                    </div>
                </div>
                <div className="w-[90%] overflow-hidden mx-auto z-[-10] 1000px:w-[50%] flex justify-center 1000px:mt-[-100px] mt-[10px]">
                    <div className="items-center">
                        <Image
                            src={require("../../public/assets/bgImage.png")}
                            alt="Logo"
                            className="z-0 scale-[1.15] h-auto mr-10"
                            priority
                            // width={500}
                            // width={30}
                            // height={30}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
