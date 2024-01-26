"use client";
import React, { FC, useEffect, useState } from "react";
import Page1 from "./Page1";
import Image from "next/image";

const SetupFund = ({ }) => {
    const backImg = require('../../../public/assets/fixedbottom.png')
    const [scroll, setScroll] = useState(false);
    const [active, setActive] = useState(1);

    const handleCountIncreaseChange = () => {
        setCount(active + 1);
    };
    const handleCountDecreaseChange = () => {
        setCount(active - 1);
    };

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    }

    return (
        <>
            <div className="w-[85%] flex mx-auto mb-[20px] 800px:mb-[60px]">
                {active === 1 && (
                    <div className="w-full h-full bg-transparent mt-[30px]">
                        <Page1 />
                    </div>
                )}
            </div>
            <div className='p-[0_50px] fixed bottom-0 w-[100%] z-[1000] flex justify-center items-center '>
                <div className='max-h-[80px] max-w-[700px] w-[80%] min-w-[300px] p-[40px_10px] relative mx-auto bg-[linear-gradient(0deg,#9c3353,#5f2747)] flex items-center'>
                    <Image
                        className='left-[120px] absolute top-[-4px] '
                        width={50}
                        height={50}
                        src={backImg}
                        alt="temp"
                    />
                    {active > 2 && <button onClick={() => handleCountDecreaseChange()} className='w-fit ml-8 underline underline-offset-4 text-white py-2 text-[15px] '>Back</button>}
                    {active === 4 &&
                        <button onClick={(e) => handleSubmit(e)} className='absolute rounded-full right-[40px] inline-block w-[120px] text-[#9c3353] py-2 bg-[#fff] text-[15px] '>Submit</button>
                    }{active !== 4 &&
                        <button onClick={() => handleCountIncreaseChange()} className='absolute rounded-full right-[40px] inline-block w-[120px] text-[#9c3353] py-2 bg-[#fff] text-[15px] '>Continue</button>
                    }
                    {active > 1 && <button className={`absolute right-[180px] text-white py-2 text-[15px] underline underline-offset-4`}><Link href={'/landingPage'}>Close</Link></button>}
                </div>
            </div>
        </>
    );
};

export default SetupFund;
