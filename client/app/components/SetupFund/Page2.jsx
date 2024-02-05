'use client'
import React, { useState, useRef, useEffect } from 'react'
import { CgOrganisation } from 'react-icons/cg';
import { GoPerson } from 'react-icons/go';
import { IoMdArrowDropdown } from 'react-icons/io';
import { TiGroup } from 'react-icons/ti';
import avatarIcon from "../../../public/assets/user1.png";
import { AiOutlineCamera } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import Image from 'next/image';
import { useDeleteBenfitterImgMutation, useAddBenfitterImgMutation } from '../../../redux/fund/fundApi';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const Page2 = ({ values, user, setFieldValue }) => {
    const {data} = useSession();
    const [deleteBenefitter, { isSuccess, error: isError }] = useDeleteBenfitterImgMutation();
    const [addBenefitter, { isSuccess: success, error }] = useAddBenfitterImgMutation();
    if (values.benefitter == 'myself') {
        if (values.benefitterImg.public_id != "" && values.benefitterImg.public_id != user.avatar.public_id) {
            deleteBenefitter(values.benefitterImg.public_id);
        }
        if(user.avatar){
            { values.benefitterImg.public_id = user.avatar.public_id }
            { values.benefitterImg.url = user.avatar.url }
        }
        values.benefitterCreatorRelation = "self"
        values.benefitterName = user.name
    }

    const divref = useRef();

    useEffect(() => {
        if (isSuccess) {
            toast.success("image added successfully");
        }
        if (isError) {
            toast.error("Please try again");
        }
    }, [isSuccess, isError]);

    const toggleBlockHidden = () => {
        if (divref.current.classList.contains("hidden")) {
            divref.current.classList.remove("hidden");
            divref.current.classList.add("block");
        } else {
            divref.current.classList.remove("block");
            divref.current.classList.add("hidden");
        }
    };

    const imageHandler = async (e) => {
        const fileReader = new FileReader();

        fileReader.onload = async () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result;
                let prevAvatar = values.benefitterImg.public_id;
                let response = await addBenefitter(avatar);
                response = response.data;
                if (response.success) {
                    values.benefitterImg.public_id = response.ans.public_id;
                    values.benefitterImg.url = response.ans.url;
                    if (prevAvatar != '' && prevAvatar != user.avatar.public_id) {
                        deleteBenefitter(prevAvatar);
                    } else {
                        toast.success("image added successfully");
                    }
                } else {
                    toast.error("Please try again");
                }
            }
        };
        fileReader.readAsDataURL(e.target.files[0]);
    };
    return (
        <div className={`flex flex-col items-center justify-center`}>
            <div className='text-[#282828] border-[1.5px] border-solid border-[#e0e1e3] tracking-widest text-[16px] p-[10px_0] bg-[hsla(210,4%,89%,.2)] w-[200px] text-center '>Beneficiary Details</div>
            <span className='my-10 tracking-[0.1em] text-[14px] text-[#5d5d5d]'>This fundraiser will benefit
                <span className='inline-block relative w-fit text-[16px] border-b-[1px] border-solid border-[#c2c2c4] ml-[10px] mr-[5px] text-left overflow-hidden text-[#282828] pr-8'>{values.benefitter}
                    <span className='absolute top-[3px] right-[6px]'><IoMdArrowDropdown onClick={() => toggleBlockHidden()} /></span>
                </span>
            </span>
            <div ref={divref} className={`${values.benefitter === "" ? "block" : "hidden"} transition-all delay-200 ease-in-out text-[#282828] relative w-full min-w-[350px] max-w-[500px] min-h-[535px] z-[2000] rounded-md border-[1px_solid_#cecece] bg-white p-[6%_5%_3%] shadow-[0_0_10px_1px_#d3d3d3] top-[-35px] right-[0px]`}>
                <span className=' h-0 w-0 top-[-14px] border-solid border-l-transparent border-r-transparent absolute border-l-[12px] border-r-[12px] border-b-[14px] border-b-[#cecece] right-[18%] 500px:right-[27%]'></span>
                <span className=' h-0 w-0 border-solid border-r-transparent border-l-transparent absolute border-l-[9px] border-r-[9px] border-b-[12px] border-b-[#fff] top-[-11.5px] right-[18%] 500px:right-[27%]'></span>
                <ul className='absolute m-[0_0_10px] w-full p-[0_10px] top-[35px] left-0'>
                    <li className='leading-[1.5rem] h-[30px] text-[rgba(0,0,0,0.87)] w-[100%] text-left mt-[15px] '>
                        <div className='p-[0_2rem] ml-[-0.75rem] mr-[-0.75rem]'>
                            <div onClick={() => { toggleBlockHidden(); setFieldValue('benefitter', 'myself', false) }} className='cursor-pointer my-auto w-full bg-[#f8f8f8] text-[14px] border-[1px_solid_#cecece] shadow-[0_0_7px_rgba(31,156,51,.32549)] rounded'>
                                <div className='my-auto p-[10px_30px_5px]'>Myself</div>
                            </div>
                        </div>
                    </li>
                    <li className="leading-[1.5rem] h-[30px] text-[rgba(0,0,0,0.87)] w-[100%] text-left mt-[35px]">
                        <label className="p-[0_2rem] ml-[-0.75rem] mr-[-0.75rem] inline-block text-[14px] w-full type-title">My family<span className='text-[12px]'>, next of kin &amp; relatives</span></label>
                        <div className="p-[0_2rem] ml-[-0.75rem] mr-[-0.75rem] grid grid-cols-2">
                            <div className="mr-5px">
                                <div onClick={() => { toggleBlockHidden(); setFieldValue('benefitter', "relative", false) }} className='cursor-pointer my-auto w-full bg-[#f8f8f8] flex items-center text-[14px] border-[1px_solid_#cecece] shadow-[0_0_7px_rgba(31,156,51,.32549)] rounded'>
                                    <GoPerson size={22} className='ml-4' />
                                    <div className='my-auto w-full p-[10px_10px_5px]'>Individual</div>
                                </div>
                            </div>
                            <div className="ml-5">
                                <div onClick={() => { toggleBlockHidden(); setFieldValue('benefitter', "relative", false) }} className='cursor-pointer my-auto w-full bg-[#f8f8f8] flex items-center text-[14px] border-[1px_solid_#cecece] shadow-[0_0_7px_rgba(31,156,51,.32549)] rounded'>
                                    <TiGroup size={22} className='ml-4' />
                                    <div className='my-auto w-full p-[10px_10px_5px]'>Group</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="leading-[1.5rem] h-[30px] text-[rgba(0,0,0,0.87)] w-[100%] text-left  mt-[55px]">
                        <label className="p-[0_2rem] ml-[-0.75rem] mr-[-0.75rem] inline-block text-[14px] w-full type-title">My friends<span className='text-[12px]'>, classmates, colleagues & people I know</span></label>
                        <div className="p-[0_2rem] ml-[-0.75rem] mr-[-0.75rem] grid grid-cols-2">
                            <div className="mr-5px">
                                <div onClick={() => { toggleBlockHidden(); setFieldValue('benefitter', "friend", false) }} className='cursor-pointer my-auto w-full bg-[#f8f8f8] flex items-center text-[14px] border-[1px_solid_#cecece] shadow-[0_0_7px_rgba(31,156,51,.32549)] rounded'>
                                    <GoPerson size={22} className='ml-4' />
                                    <div className='my-auto p-[10px_10px_5px]'>Individual</div>
                                </div>
                            </div>
                            <div className="ml-5">
                                <div onClick={() => { toggleBlockHidden(); setFieldValue('benefitter', "friend", false) }} className='cursor-pointer my-auto w-full bg-[#f8f8f8] flex items-center text-[14px] border-[1px_solid_#cecece] shadow-[0_0_7px_rgba(31,156,51,.32549)] rounded'>
                                    <TiGroup size={22} className='ml-4' />
                                    <div className='my-auto p-[10px_10px_5px]'>Group</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="leading-[1.5rem] h-[30px] text-[rgba(0,0,0,0.87)] w-[100%] text-left  mt-[55px]">
                        <label className="p-[0_2rem] ml-[-0.75rem] mr-[-0.75rem] inline-block text-[14px] w-full type-title">Others<span className='text-[12px]'> (everyone else: people, animals, businesses, communities etc)</span></label>
                        <div className="p-[0_2rem] ml-[-0.75rem] mr-[-0.75rem] grid grid-cols-2">
                            <div className="mr-5px">
                                <div onClick={() => { toggleBlockHidden(); setFieldValue('benefitter', "others", false) }} className='cursor-pointer my-auto w-full bg-[#f8f8f8] flex items-center text-[14px] border-[1px_solid_#cecece] shadow-[0_0_7px_rgba(31,156,51,.32549)] rounded'>
                                    <GoPerson size={22} className='ml-4' />
                                    <div className='my-auto p-[10px_10px_5px]'>Individual</div>
                                </div>
                            </div>
                            <div className="ml-5">
                                <div onClick={() => { toggleBlockHidden(); setFieldValue('benefitter', "others", false) }} className='cursor-pointer my-auto w-full bg-[#f8f8f8] flex items-center text-[14px] border-[1px_solid_#cecece] shadow-[0_0_7px_rgba(31,156,51,.32549)] rounded'>
                                    <TiGroup size={22} className='ml-4' />
                                    <div className='my-auto p-[10px_10px_5px]'>Group</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className='leading-[1.5rem] h-[30px] text-[rgba(0,0,0,0.87)] w-[100%] text-left mt-[70px] '>
                        <div className='p-[0_2rem] ml-[-0.75rem] mr-[-0.75rem] '>
                            <div className='cursor-pointer my-auto w-full bg-[#f8f8f8] text-[14px] border-[1px_solid_#cecece] shadow-[0_0_7px_rgba(31,156,51,.32549)] rounded'>
                                <div className="my-auto p-[10px_10px_5px]" onClick={() => { toggleBlockHidden(); setFieldValue('benefitter', "NGO", false) }}>
                                    <div className='flex items-center align-middle'>
                                        <CgOrganisation size={22} className='ml-4' />
                                        <div className='my-auto p-[10px_10px_5px]'>Registered NGO</div>
                                    </div>
                                    <div className='ml-4'>
                                        A registered not-for-profit that has a valid PAN card issued in its name
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Myself */}
            {values.benefitter === "myself" && (
                <div className='items-center border-solid border-2 border-[#beb0b4] mb-20 rounded-3xl overflow-hidden shadow-2xl'>
                    <div className='flex justify-center px-1 py-3 bg-slate-200'>
                        <div className="relative">
                            <Image
                                src={values.benefitterImg.url || data?.user.image || avatarIcon}
                                alt=""
                                width={120}
                                height={120}
                                className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#9c3353] rounded-full"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-col px-4 py-4 mx-auto space-y-4 border-t border-b-0 500px:px-10'>
                            <div> <span>I'm </span>
                                <input value={values.createdBy} readOnly type="text" name="benefitterName" id="name" className='flex-1 py-1 text-gray-600 border-b-2 border-gray-400 outline-none' placeholder='  Name' />
                            </div>
                            <div>
                                <input value={values.benefitterAge} onChange={(e) => setFieldValue('benefitterAge', e.target.value, false)} type="number" className='flex-1 py-1 mr-1 text-gray-600 border-b-2 border-gray-400 outline-none' placeholder='Age' />
                                <select id="date" name="date" className='flex-1 py-1.5 border-b-2 border-gray-400 text-gray-600 outline-none'>
                                    <option value="year">years</option>
                                    <option value="month">months</option>
                                    <option value="day">days</option>
                                </select>
                            </div>
                            <div className="py-3 grid w-[18rem] grid-cols-3">
                                <div>
                                    <input value={"Male"} type="radio" name="benefitterGender" id="Male" className="hidden peer" onClick={() => setFieldValue('benefitterGender', 'Male', false)} />
                                    <label htmlFor="Male" className={(values.benefitterGender === "Male") ? 'block cursor-pointer select-none p-2 text-center bg-[#9c3353] font-bold text-white' : 'block cursor-pointer select-none p-2 text-center'}>Male</label>
                                </div>
                                <div>
                                    <input value={"Female"} type="radio" name="benefitterGenderChange" id="Female" className="hidden peer" onClick={() => setFieldValue('benefitterGender', 'Female', false)} />
                                    <label htmlFor="Female" className={(values.benefitterGender === "Female") ? 'block cursor-pointer select-none p-2 text-center bg-[#9c3353] font-bold text-white' : 'block cursor-pointer select-none p-2 text-center'}>Female</label>
                                </div>
                                <div>
                                    <input value={"Other"} type='radio' name="benefitterGenderChange" id="Other" className="hidden peer" onClick={() => setFieldValue('benefitterGender', 'Other', false)} />
                                    <label htmlFor="Other" className={(values.benefitterGender === "Other") ? 'block cursor-pointer select-none p-2 text-center bg-[#9c3353] font-bold text-white' : 'block cursor-pointer select-none p-2 text-center'}>Other</label>
                                </div>
                            </div>
                            <div>I'm residing in
                                <input value={values.benefitterAddress}
                                    onChange={(e) => setFieldValue('benefitterAddress', e.target.value, false)}
                                    type="text" name="benefitterAddress" id="benefitterAddress"
                                    className='flex-1 ml-1 text-gray-600 border-b-2 border-gray-400 outline-none' />
                            </div>
                        </div>
                        <div className='p-4 px-5 500px:px-20 bg-slate-200'>
                            <div className='border-b-2 border-gray-400'>
                                <BsFillTelephoneFill className='text-[#000000] inline' />
                                <select id="ccode" name="ccode" className='flex-1 py-1.5 outline-none inline bg-slate-200'>
                                    <option value="0">+91</option>
                                    <option value="1">+1</option>
                                    <option value="2">+44</option>
                                </select>
                                <input value={values.benefitterContact} onChange={(e) => setFieldValue('benefitterContact', e.target.value, false)} type="number" name="benefitterContact" id="benefitterContact" className='flex-1 inline py-1 text-gray-600 outline-none bg-slate-200' placeholder="Beneficiary's mobile no." />
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Relative */}
            {values.benefitter === "relative" &&
                <div className='items-center border-solid border-2 border-[#beb0b4] mb-20 rounded-3xl overflow-hidden shadow-2xl'>
                    <div className="flex justify-center w-full p-3 bg-slate-200">
                        <div className="relative">
                            <Image
                                src={values.benefitterImg.url || avatarIcon}
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
                    <div className='items-center px-8 py-4 pb-10 space-y-4 border-t border-b-0 600px:px-16'>
                        <div>
                            <input value={values.benefitterName} onChange={(e) => setFieldValue('benefitterName', e.target.value, false)} type="text" name="benefitterName" id="benefitterName" className='flex-1 w-full py-1 text-gray-600 border-b-2 border-gray-400 outline-none' placeholder="Relative's name" />
                        </div>
                        <div className='inline-block ml-5'>
                            is my
                            <select id="benefitterCreatorRelation" name="benefitterCreatorRelation" className='flex-1 py-1.5 pl-2 pr-5 border-b-2 border-gray-400 text-gray-600 outline-none'>
                                <option value="0">relation</option>
                                <option onClick={(e) => setFieldValue('benefitterCreatorRelation', father, false)} value="1">father</option>
                                <option onClick={(e) => setFieldValue('benefitterCreatorRelation', mother, false)} value="2">mother</option>
                                <option onClick={(e) => setFieldValue('benefitterCreatorRelation', sister, false)} value="3">sister</option>
                                <option onClick={(e) => setFieldValue('benefitterCreatorRelation', brother, false)} value="4">brother</option>
                                <option onClick={(e) => setFieldValue('benefitterCreatorRelation', spouse, false)} value="5">spouse</option>
                            </select>
                        </div>
                        <div className='flex justify-center 400px:block'>
                            <input value={values.benefitterAge} onChange={(e) => setFieldValue('benefitterAge', e.target.value, false)} type="number" name="benefitterAge" id="benefitterAge" className='flex-1 py-1 mr-1 text-gray-600 border-b-2 border-gray-400 outline-none' placeholder='Age' />
                            <select id="date" name="date" className='flex-1 py-1.5 border-b-2 border-gray-400 text-gray-600 outline-none'>
                                <option value="year">years</option>
                                <option value="month">months</option>
                                <option value="day">days</option>
                            </select>
                        </div>
                        <br />
                        <div>& residing in <input value={values.benefitterAddress} onChange={(e) => setFieldValue('benefitterAddress', e.target.value, false)} type="text" name="benefitterAddress" id="benefitterAddress" className='flex-1 py-0 text-gray-600 border-b-2 border-gray-400 outline-none' /> </div>

                    </div>
                    <div className='px-8 py-4 600px:px-16 bg-slate-200'>
                        <div className='border-b-2 border-gray-400'>
                            <BsFillTelephoneFill className='text-[#000000] inline' />
                            <select id="ccode" name="ccode" className='flex-1 py-1.5 outline-none inline bg-slate-200'>
                                <option value="0">+91</option>
                                <option value="1">+1</option>
                                <option value="2">+2</option>
                            </select>
                            <input value={values.benefitterContact} onChange={(e) => setFieldValue('benefitterContact', e.target.value, false)} type="number" name="benefitterContact" id="benefitterContact" className='flex-1 inline py-1 text-gray-600 outline-none bg-slate-200' placeholder="Beneficiary's mobile no." />
                        </div>
                    </div>
                </div>
            }

            {/* Frined */}
            {values.benefitter === "friend"
                && <div className='items-center border-solid border-2 border-[#beb0b4] mb-20 rounded-3xl overflow-hidden shadow-2xl'>
                    <div className="flex justify-center w-full p-3 bg-slate-200">
                        <div className="relative">
                            <Image
                                src={values.benefitterImg.url || avatarIcon}
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

                    <div className='items-center px-4 py-4 pb-10 space-y-4 border-t border-b-0 400px:px-12'>
                        <div>
                            <input value={values.benefitterName} onChange={(e) => setFieldValue('benefitterName', e.target.value, false)} type="text" name="benefitterName" id="benefitterName" className='flex-1 w-full py-1 text-gray-600 border-b-2 border-gray-400 outline-none' placeholder="Relative's name" />
                        </div>
                        <div className='flex justify-center 400px:block'>
                            <input value={values.benefitterAge} onChange={(e) => setFieldValue('benefitterAge', e.target.value, false)} type="number" name="benefitterAge" id="benefitterAge" className='flex-1 py-1 mr-1 text-gray-600 border-b-2 border-gray-400 outline-none' placeholder='Age' />
                            <select id="date" name="date" className='flex-1 py-1.5 border-b-2 border-gray-400 text-gray-600 outline-none'>
                                <option value="year">years</option>
                                <option value="month">months</option>
                                <option value="day">days</option>
                            </select>
                        </div>
                        <div className="py-3 grid w-[18rem] grid-cols-3">
                            <div>
                                <input value="Male" type="radio" name="benefitterGender" id="Male" className="hidden peer" onClick={() => setFieldValue('benefitterGender', 'Male', false)} />
                                <label htmlFor="Male" className={(values.benefitterGender === "Male") ? 'block cursor-pointer select-none p-2 text-center bg-[#9c3353] font-bold text-white' : 'block cursor-pointer select-none p-2 text-center'}>Male</label>
                            </div>
                            <div>
                                <input value={"Female"} type="radio" name="benefitterGenderChange" id="Female" className="hidden peer" onClick={() => setFieldValue('benefitterGender', 'Female', false)} />
                                <label htmlFor="Female" className={(values.benefitterGender === "Female") ? 'block cursor-pointer select-none p-2 text-center bg-[#9c3353] font-bold text-white' : 'block cursor-pointer select-none p-2 text-center'}>Female</label>
                            </div>
                            <div>
                                <input value={"Other"} type='radio' name="benefitterGenderChange" id="Other" className="hidden peer" onClick={() => setFieldValue('benefitterGender', 'Other', false)} />
                                <label htmlFor="Other" className={(values.benefitterGender === "Other") ? 'block cursor-pointer select-none p-2 text-center bg-[#9c3353] font-bold text-white' : 'block cursor-pointer select-none p-2 text-center'}>Other</label>
                            </div>
                        </div>
                        <div>& residing in <input value={values.benefitterAddress} onChange={(e) => setFieldValue('benefitterAddress', e.target.value, false)} type="text" name="benefitterAddress" id="benefitterAddress" className='flex-1 py-0 text-gray-600 border-b-2 border-gray-400 outline-none' /> </div>
                    </div>
                    <div className='px-8 py-4 600px:px-16 bg-slate-200'>
                        <div className='border-b-2 border-gray-400'>
                            <BsFillTelephoneFill className='text-[#000000] inline' />
                            <select id="ccode" name="ccode" className='flex-1 py-1.5 outline-none inline bg-slate-200'>
                                <option value="0">+91</option>
                                <option value="1">+1</option>
                                <option value="2">+44</option>
                            </select>
                            <input value={values.benefitterContact} onChange={(e) => setFieldValue('benefitterContact', e.target.value, false)} type="number" name="benefitterContact" id="benefitterContact" className='flex-1 inline py-1 text-gray-600 outline-none bg-slate-200' placeholder="Beneficiary's mobile no." />
                        </div>
                    </div>
                </div>
            }

            {/* Others */}
            {values.benefitter === "others"
                && <div className='items-center border-solid border-2 border-[#beb0b4] mb-20 rounded-3xl overflow-hidden shadow-2xl'>
                    <div className="flex justify-center w-full p-3 bg-slate-200">
                        <div className="relative">
                            <Image
                                src={values.benefitterImg.url || avatarIcon}
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

                    <div className='items-center px-4 py-4 pb-10 mt-3 space-y-4 border-t border-b-0 400px:px-12'>
                        <div>Funds raised will help
                            <input value={values.benefitterName} onChange={(e) => setFieldValue('benefitterName', e.target.value, false)} type="text" name="benefitterName" id="benefitterName" className='flex-1 w-full py-1 text-gray-600 border-b-2 border-gray-400 outline-none' placeholder="Community name, Business name etc" />
                        </div>
                        <div className='pt-3 my-8 ml-4 mr-2'>based out of<input value={values.benefitterAddress} onChange={(e) => setFieldValue('benefitterAddress', e.target.value, false)} type="text" name="benefitterAddress" id="city" className='py-0 ml-2 text-gray-600 border-b-2 border-gray-400 outline-none' /> </div>
                    </div>
                    <div className='px-8 py-4 600px:px-16 bg-slate-200'>
                        <div className='border-b-2 border-gray-400'>
                            <BsFillTelephoneFill className='text-[#000000] inline' />
                            <select id="ccode" name="ccode" className='flex-1 py-1.5 outline-none inline bg-slate-200'>
                                <option value="0">+91</option>
                                <option value="1">+1</option>
                                <option value="2">+44</option>
                            </select>
                            <input value={values.benefitterContact} onChange={(e) => setFieldValue('benefitterContact', e.target.value, false)} type="number" name="benefitterContact" id="benefitterContact" className='flex-1 inline py-1 text-gray-600 outline-none bg-slate-200' placeholder="Beneficiary's mobile no." />
                        </div>
                    </div>
                </div>
            }

            {/* NGO */}
            {values.benefitter === "NGO"
                && <div className='items-center border-solid border-2 border-[#beb0b4] mb-20 rounded-3xl overflow-hidden shadow-2xl'>
                    <div className="flex justify-center w-full p-3 bg-slate-200">
                        <div className="relative">
                            <Image
                                src={values.benefitterImg.url || avatarIcon}
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
                    <div className='items-center px-3 py-6 pb-10 space-y-4 border-t border-b-0'>
                        <div className='py-3 text-center text-black'>This fundraiser raised will benefit
                            <input value={values.benefitterName} onChange={(e) => setFieldValue('benefitterName', e.target.value, false)} type="text" name="benefitterName" id="benefitterName"
                                className='flex-1 w-[95%] 600px:w-[80%] py-1 text-gray-600 border-b-2 border-gray-400 outline-none' placeholder="NGO name" />
                        </div>
                        <div className='pt-3 my-8 text-center text-black'>
                            based out of
                            <input value={values.benefitterAddress} onChange={(e) => setFieldValue('benefitterAddress', e.target.value, false)} type="text" name="benefitterAddress" id="city"
                                className='py-0 ml-2 text-gray-600 border-b-2 border-gray-400 outline-none' placeholder='location' />
                        </div>
                    </div>
                    <div className='px-5 py-4 bg-slate-200'>
                        <div className='border-b-2 border-gray-400'>
                            <BsFillTelephoneFill className='text-[#000000] inline' />
                            <select id="ccode" name="ccode" className='flex-1 py-1.5 outline-none inline bg-slate-200'>
                                <option value="0">+91</option>
                                <option value="1">+1</option>
                                <option value="2">+44</option>
                            </select>
                            <input value={values.benefitterContact} onChange={(e) => setFieldValue('benefitterContact', e.target.value, false)} type="number" name="benefitterContact" id="benefitterContact" className='flex-1 inline py-1 text-gray-600 outline-none bg-slate-200' placeholder="Beneficiary's mobile no." />
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Page2