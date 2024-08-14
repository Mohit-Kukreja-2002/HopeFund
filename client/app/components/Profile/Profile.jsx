"use client";
import React, { useEffect, useRef, useState } from "react";
import SideBarProfile from "./SideBarProfile.jsx";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useLogOutQuery } from "../../../redux/features/auth/authApi.js";

import ProfileInfo from "./ProfileInfo";
import YourFunds from "./YourFunds.jsx";
import YourDonations from "./YourDonations.jsx";
import { initializeApp } from "../../../redux/store";

const Profile = ({ user, active, setActive }) => {

  const [logout, setLogout] = useState(false);
  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    signOut();
    toast.success("Logout successful")
  };

  useEffect(()=>{
    initializeApp();
  },[active])

  const rightBoxRef = useRef(null);
  const leftBoxRef = useRef(null);
  const [isFixed, setIsFixed] = useState(true)
  const [topOffset, setTopOffset] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      if (leftBoxRef.current && rightBoxRef.current) {
        const rightBoxHeight = rightBoxRef.current.offsetHeight;
        const offsetTop = leftBoxRef.current.offsetTop;

        if (window.scrollY >= (leftBoxRef.current.offsetHeight + offsetTop - rightBoxHeight - 140)) {
          setIsFixed(false);
          setTopOffset(leftBoxRef.current.offsetHeight + offsetTop - rightBoxHeight - 80);
        } else {
          setIsFixed(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="h-full w-[85%] flex mx-auto mb-4">
      <div ref={rightBoxRef}
        className={`w-[60px] 800px:w-[320px] h-[400px] bg-opacity-90 border bg-white border-[#00000014] 
        rounded-[5px] shadow-sm mt-[80px] ${isFixed ? 'fixed top-[60px]' : "absolute" } left-[20px] 800px:left-[60px]`}
        style={{ top: isFixed ? '60px' : `${topOffset}px` }}
      >
        <SideBarProfile
          user={user}
          active={active}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      <div ref={leftBoxRef} className="w-full 800px:ml-[305px] 900px:ml-[320px] ml-[60px]">
        {active === 1 && (
          <div className="w-full h-full bg-transparent mt-[80px]">
            <ProfileInfo user={user} />
          </div>
        )}

        {active === 2 && (
          <div className="w-full h-full bg-transparent mt-[80px]">
            <YourFunds user={user} />
          </div>
        )}

        {active === 3 && (
          <div className="w-full h-full bg-transparent mt-[80px]">
            <YourDonations user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
