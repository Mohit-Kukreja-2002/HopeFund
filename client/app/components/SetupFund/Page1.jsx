'use client'
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { GoPerson } from 'react-icons/go'
import { AiOutlineCheck, AiTwotonePlusCircle } from 'react-icons/ai'
import { TiGroup } from 'react-icons/ti'
import { MdSchool } from 'react-icons/md'
import { GiCandleLight } from 'react-icons/gi'
import { BsThreeDots, BsFillTelephoneFill } from 'react-icons/bs'
import { CgOrganisation } from 'react-icons/cg'
import { RiStethoscopeLine } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md'
const Page1 = ({values,setFieldValue}) => {    
    return (
        <>
            <div className={`flex flex-col items-center justify-center`}>
                <div className='text-[#282828] border-[1.5px] border-solid border-[#e0e1e3] tracking-widest text-[16px] p-[10px_0] bg-[hsla(210,4%,89%,.2)] w-[200px] text-center '>Basic Details</div>
                <div className='flex items-center justify-center mx-auto my-10 text-center'>
                    <span className='tracking-[0.1em] text-[14px] text-[#5d5d5d]'>I am raising funds for a/an
                        <span id="category" className='relative w-[122px] text-[16px] border-b-[1px] border-solid border-[#c2c2c4] ml-[10px] mr-[5px] text-left overflow-hidden text-[#282828] pr-8'>{values.category}
                            <span className='absolute top-[3px] right-[6px]'><IoMdArrowDropdown /></span>
                        </span>
                        cause
                    </span>
                </div>
                <div className='min-w-[350px] 800px:w-[40%] 800px:min-w-[350px] py-4 flex items-center my-auto justify-center flex-col mb-[30px] rounded-[4px] border-[1px] border-solid border-[#fff] shadow-[0_2px_2px_0_rgba(0,0,0,.14),0_3px_1px_-2px_rgba(0,0,0,.12),0_1px_5px_0_rgba(0,0,0,.2)]'>
                {/* <div className='w-[60%] min-w-[170px] 800px:w-[40%] 800px:min-w-[350px] py-4 flex items-center my-auto justify-center flex-col mb-[30px] rounded-[4px] border-[1px] border-solid border-[#fff] shadow-[0_2px_2px_0_rgba(0,0,0,.14),0_3px_1px_-2px_rgba(0,0,0,.12),0_1px_5px_0_rgba(0,0,0,.2)]'> */}
                    <span className='h-0 w-0 top-[-12px] border-solid border-l-transparent border-r-transparent absolute border-l-[8px] border-r-[8px] border-b-[11px] border-b-[#f5f5f5]'></span>
                    <span className=' h-0 w-0 border-solid border-r-transparent border-l-transparent absolute border-l-[6px] border-r-[6px] border-b-[13px] border-b-[#fff] top-[-11.5px]'></span>
                    <div className='flex flex-col items-center justify-center w-[90%] 800px:flex-row mb-3 800px:mb-5'>
                        <div className='flex justify-center items-center hover:bg-transparent cursor-pointer w-[90%] mb-3 800px:mb-0 800px:w-[45%] 800px:mr-3' onClick={()=>setFieldValue('category','medical',false)}>
                            <span className={`${values.category === "medical" ? " border-[#eaeaea] bg-[#691a47] text-[#fff] " : "bg-white text-[#282828]"} w-full text-[20px] py-4 justify-center items-center rounded border-[1px] border-solid border-[#ecedee] flex `}>
                                {values.category === "medical" && <AiOutlineCheck className='' />}
                                <div className='flex'>
                                    <RiStethoscopeLine size={20} className={`${values.category !== "medical" ? " text-[#9c3353]" : "text-white mx-1"} w-6 h-6`} />
                                    <span className='tracking-wider'>Medical</span>
                                </div>
                            </span>
                        </div>
                        <div className='flex justify-center items-center hover:bg-transparent cursor-pointer w-[90%] 800px:w-[45%] ' onClick={()=>setFieldValue('category','education',false)}>
                            <span className={`${values.category === "education" ? " border-[#eaeaea] bg-[#691a47] text-[#fff] " : "bg-white text-[#282828]"} w-full text-[20px] py-4 justify-center items-center rounded border-[1px] border-solid border-[#ecedee] flex `}>
                                {values.category === "education" && <AiOutlineCheck className='' />}
                                <div id='category' value='education' className='flex'>
                                    <MdSchool size={20} className={`${values.category !== "education" ? " text-[#9c3353]" : "text-white mx-1"} w-6 h-6`} />
                                    <span id='category' value='education' className='tracking-wider'>Education</span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center w-[90%] 800px:flex-row'>
                        <div className='flex justify-center items-center hover:bg-transparent cursor-pointer w-[90%] mb-3 800px:mb-0 800px:w-[45%] 800px:mr-3' onClick={()=>setFieldValue('category','memorial',false)}>
                            <span className={`${values.category === "memorial" ? " border-[#eaeaea] bg-[#691a47] text-[#fff] " : "bg-white text-[#282828]"} w-full text-[20px] py-4 justify-center items-center rounded border-[1px] border-solid border-[#ecedee] flex `}>
                                {values.category === "memorial" && <AiOutlineCheck className='' />}
                                <div className='flex'>
                                    <GiCandleLight size={20} className={`${values.category !== "memorial" ? " text-[#9c3353]" : "text-white mx-1"} w-6 h-6`} />
                                    <span className='tracking-wider'>Memorial</span>
                                </div>
                            </span>
                        </div>
                        <div className='flex justify-center items-center hover:bg-transparent cursor-pointer w-[90%] 800px:w-[45%] ' onClick={()=>setFieldValue('category','others',false)}>
                            <span className={`${values.category === "others" ? " border-[#eaeaea] bg-[#691a47] text-[#fff] " : "bg-white text-[#282828]"} w-full text-[20px] py-4 justify-center items-center rounded border-[1px] border-solid border-[#ecedee] flex `}>
                                {values.category === "others" && <AiOutlineCheck className='' />}
                                <div className='flex'>
                                    <BsThreeDots size={20} className={`${values.category !== "others" ? " text-[#9c3353]" : "text-white mx-1"} w-6 h-6`} />
                                    <span className='tracking-wider'>Others</span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[70%] min-w-[300px] 800px:w-[40%] 800px:min-w-[450px] mx-auto items-center mt-12">
                <div className="relative">
                    <input value={values.createdBy} readOnly id="createdBy" type="name" className="peer h-10 w-[90%] border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="name" />
                    <label htmlFor="createdBy" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Creator Name</label>
                </div>
                <div className="relative my-10">
                    <input value={values.creatorMail} readOnly id="creatorMail" type="text" className="w-[90%] h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-rose-600" placeholder="john@doe.com" />
                    <label htmlFor="creatorMail" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Creator Email address</label>
                </div>
            </div>
        </>
    )
}

export default Page1