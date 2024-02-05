import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/user.png";
// import { RiLockPasswordLine } from "react-icons/ri";
import { FaDonate } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import Link from "next/link";
import { useSession } from "next-auth/react";

const SideBarProfile = ({ user, active, setActive, logOutHandler, }) => {
    const {data} = useSession();
    return (
        <div className="w-full">
            <div
                className={`w-full flex items-center px-3 py-4 shadow-[0_0_30px_0_rgba(156,51,83,.2) cursor-pointer 
                    ${active === 1 ? "bg-[#9c3353]" : "bg-transparent"}`}
                onClick={() => setActive(1)}
            >
                <Image
                    src={
                        user.avatar 
                        ? user.avatar.url :
                        data ? data.user.image : avatarDefault
                    }
                    alt=""
                    width={20}
                    height={20}
                    className="w-[20px] border-white border h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
                />
                <h5 className={`hidden pl-2 ${active === 1 ? "text-white" : " text-black"} 800px:block font-Poppins`}>
                    My Account
                </h5>
            </div>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? " bg-[#9c3353]" : "bg-transparent"}`}
                onClick={() => setActive(2)}>
                <BsFillCollectionFill size={20} className={`${active === 2 ? "text-white" : " text-black"}  `} />
                <h5 className={`hidden pl-2 ${active === 2 ? "text-white" : " text-black"} 800px:block font-Poppins`}>
                    Your Fundraisers
                </h5>
            </div>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? " bg-[#9c3353]" : "bg-transparent"
                    }`}
                onClick={() => setActive(3)}
            >
                <FaDonate size={20} className={`${active === 3 ? "text-white" : " text-black"}  `}/>
                <h5 className={`hidden pl-2 ${active === 3 ? "text-white" : " text-black"} 800px:block font-Poppins`}>
                    Your Donations
                </h5>
            </div>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? " bg-white" : "bg-transparent"
                    }`}
                onClick={() => logOutHandler()}
            >
                <AiOutlineLogout size={20} className="text-black" />
                <h5 className="hidden pl-2 text-black 800px:block font-Poppins">
                    Log Out
                </h5>
            </div>
        </div>
    );
};

export default SideBarProfile;
