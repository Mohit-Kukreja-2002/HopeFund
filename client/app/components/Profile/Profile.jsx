"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile.jsx";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useLogOutQuery } from "../../../redux/features/auth/authApi.js";

import ProfileInfo from "./ProfileInfo";
// import ChangePassword from "./ChangePassword";
// import CourseCard from "../Course/CourseCard";
// import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";


const Profile = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  //   const [courses, setCourses] = useState([]);
  //   const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const [active, setActive] = useState(1);

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
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

//   useEffect(() => {
//     if (data) {
//       const filteredCourses = user.courses
//         .map((userCourse) =>
//           data.courses.find((course) => course._id === userCourse._id)
//         )
//         .filter((course) => course !== undefined);
//       setCourses(filteredCourses);
//     }
//   }, [data]);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] bg-opacity-90 border bg-white border-[#00000014] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}

      {/* {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )} */}

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
