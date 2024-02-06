import Image from "next/image";
import { useSession } from "next-auth/react";
// import { styles } from "../../../app/styles/style";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/user.png";
// import {useEditProfileMutation,useUpdateAvatarMutation} from "@/redux/features/user/userApi";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { toast } from "react-hot-toast";
import { useEditProfileMutation, useUpdateAvatarMutation } from "../../../redux/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";

const ProfileInfo = ({ user }) => {
  const { data } = useSession();

  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if (success) {
      toast.success("Profile updated successfully!");
      setLoadUser(true);
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="relative">
          <Image
            src={user.avatar
              ? user.avatar.url
              : data ?
                data.user.image
                : avatarIcon
            }
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#9c3353] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] text-white h-[30px] bg-[#9c3353] rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] 800px:min-w-[350px] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`text-black bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                readOnly
                className={`text-black bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-full 800px:w-[250px] h-[40px] border border-[#9c3353] text-center text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
