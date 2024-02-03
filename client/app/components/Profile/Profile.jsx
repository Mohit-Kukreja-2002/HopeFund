"use client";
import React, { useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile.jsx";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useLogOutQuery } from "../../../redux/features/auth/authApi.js";

import ProfileInfo from "./ProfileInfo";
import YourFunds from "./YourFunds.jsx";


const Profile = ({ user, active, setActive }) => {
  const [avatar, setAvatar] = useState(null);

  const [logout, setLogout] = useState(false);
  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    signOut();
  };


  return (
    <div className="w-[85%] flex mx-auto mb-4">
      <div
        className={`w-[60px] 800px:w-[320px] h-[450px] bg-opacity-90 border bg-white border-[#00000014] 
        rounded-[5px] shadow-sm mt-[80px] fixed top-[60px] left-[20px] 800px:left-[60px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      <div className="w-full 800px:ml-[305px] 900px:ml-[320px] ml-[60px]">
        {active === 1 && (
          <div className="w-full h-full bg-transparent mt-[80px]">
            <ProfileInfo avatar={avatar} user={user} />
          </div>
        )}

        {active === 2 && (
          <div className="w-full h-full bg-transparent mt-[80px]">
            <YourFunds user={user} />
          </div>
        )}
      </div>

      {/* {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
            {courses &&
              courses.map((item, index) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins text-black">
              You don&apos;t have any purchased courses!
            </h1>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Profile;
