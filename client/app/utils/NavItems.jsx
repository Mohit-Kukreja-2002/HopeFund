import Link from "next/link";
import React from "react";

export const navItemsData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Donate",
        url: "/donate",
    },
    {
        name: "Contact",
        url: "/contact-us",
    },
    //   {
    //     name: "Policy",
    //     url: "/policy",
    //   },
    //   {
    //     name: "FAQ",
    //     url: "/faq",
    //   },
];


const NavItems = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className="hidden w-full h-full align-middle 800px:flex">
                {navItemsData &&
                    navItemsData.map((i, index) => (
                        <Link className="w-full h-full " href={`${i.url}`} key={index} passHref>
                            <span className={`w-full ${activeItem === index
                                ? "bg-[#9c3353] text-[#ffc1d3]"
                                : "hover:bg-[#f5f5f5] text-[#212121] bg-white"} 
                            text-[16px] my-0 px-6 pb-[28px] pt-[29px] font-Poppins font-[400]`}>
                                {i.name}
                            </span>
                        </Link>
                    ))}
            </div>
            {isMobile && (
                <div className="mt-5 800px:hidden">
                    <div className="w-full py-6 text-center">
                        <Link href={"/"} passHref>
                            <span
                                className={`text-[25px] font-Poppins font-[700] text-[#9c3353] `}
                            >HopeFund</span>
                        </Link>
                    </div>
                    {navItemsData &&
                        navItemsData.map((i, index) => (
                            <Link href={i.url} passHref key={index}>
                                <span
                                    className={`${activeItem === index
                                        ? "text-[#9c3353] underline underline-offset-2"
                                        : "text-[#212121]"
                                        } block py-5 text-[18px] px-6 font-Poppins font-[400] hover:text-[#9c3353]`}
                                >
                                    {i.name}
                                </span>
                            </Link>
                        ))
                        // <Link>
                    }
                    {
                        <div className={`${activeItem === 5 ? "block" : "block 700px:hidden"}`} >
                            <Link href={'/createFund'}>
                                <span
                                    className={`${activeItem === 5
                                        ? "text-[#9c3353] underline underline-offset-2"
                                        : "text-[#212121]"
                                        } block py-5 text-[18px] px-6 font-Poppins font-[400] hover:text-[#9c3353]`}
                                >
                                    Create a Fundraiser
                                </span>
                            </Link>
                        </div>
                    }
                </div >
            )}
        </>
    );
};

export default NavItems;
