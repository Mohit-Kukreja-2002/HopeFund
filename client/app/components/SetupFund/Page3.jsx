'use client'
import React from 'react'

const Page3 = ({ values, setFieldValue }) => {
    return (
        <>
            <div className={`flex flex-col items-center justify-center`}>
                <div className='text-[#282828] border-[1.5px] border-solid border-[#e0e1e3] tracking-widest text-[16px] p-[10px_0] bg-[hsla(210,4%,89%,.2)] w-[200px] text-center '>Beneficiary Details</div>
                <span className='text-center my-10 tracking-[0.1em] text-[14px] text-[#5d5d5d]'>I am raising funds for a/an
                    <span className='inline-block relative w-[122px] text-[16px] border-b-[1px] border-solid border-[#c2c2c4] ml-[10px] mr-[5px] text-left overflow-hidden text-[#282828] pr-8'>
                        {values.category}
                    </span>
                    cause
                </span>
                {/* <div className='relative mb-[30px] w-[549px] rounded-[4px] border-[1px] border-solid border-[#fff] shadow-[0_2px_2px_0_rgba(0,0,0,.14),0_3px_1px_-2px_rgba(0,0,0,.12),0_1px_5px_0_rgba(0,0,0,.2)]'>
                    <span className=' h-0 w-0 top-[-12px] right-[25%] border-solid border-l-transparent border-r-transparent absolute border-l-[8px] border-r-[8px] border-b-[11px] border-b-[#f5f5f5]'></span>
                    <span className=' h-0 w-0 border-solid border-r-transparent border-l-transparent absolute border-l-[6px] border-r-[6px] border-b-[13px] border-b-[#fff] top-[-11.5px] right-[25.5%]'></span>
                    <ul className='m-[14px_0] p-[0_14px] text-[16px]'>
                        <div className='flex mt-[10px]'>
                            <li className='hover:bg-transparent cursor-pointer p-[0_5px] w-[50%] ' onClick={() => handleCauseChange("medical")}>
                                <span className={`${cause === "medical" ? " border-[#eaeaea] bg-[#691a47] text-[#fff] " : "bg-white text-[#282828]"} text-[20px] py-4 align-middle items-center rounded w-[100%] relative border-[1px] border-solid border-[#ecedee] flex `}>
                                    {cause === "medical" && <AiOutlineCheck className='ml-3' />}
                                    <div className='flex'>
                                        <RiStethoscopeLine size={20} className={`${cause !== "medical" ? "ml-10 mr-3 text-[#9c3353]" : "text-white mx-3"} w-6 h-6`} />
                                        <span className='tracking-wider'>Medical</span>
                                    </div>
                                </span>
                            </li>
                            <li className='hover:bg-transparent cursor-pointer p-[0_5px] w-[50%]' onClick={() => handleCauseChange("education")}>
                                <span className={`${cause === "education" ? " border-[#eaeaea] bg-[#691a47] text-[#fff] " : "bg-white text-[#282828]"} text-[20px] py-4 align-middle items-center rounded w-[100%] relative border-[1px] border-solid border-[#ecedee] flex `}>
                                    {cause === "education" && <AiOutlineCheck className='ml-3' />}
                                    <div className='flex'>
                                        <MdSchool size={20} className={`${cause !== "education" ? "ml-10 mr-3 text-[#9c3353]" : "text-white mx-3"} w-6 h-6`} />
                                        <span className='tracking-wider'>Education</span>
                                    </div>
                                </span>
                            </li>
                        </div>
                        <div className='flex my-[10px]'>
                            <li className='hover:bg-transparent cursor-pointer p-[0_5px] w-[50%]' onClick={() => handleCauseChange("memorial")}>
                                <span className={`${cause === "memorial" ? " border-[#eaeaea] bg-[#691a47] text-[#fff] " : "bg-white text-[#282828]"} text-[20px] py-4 align-middle items-center rounded w-[100%] relative border-[1px] border-solid border-[#ecedee] flex `}>
                                    {cause === "memorial" && <AiOutlineCheck className='ml-3' />}
                                    <div className='flex'>
                                        <GiCandleLight size={20} className={`${cause !== "memorial" ? "ml-10 mr-3 text-[#9c3353]" : "text-white mx-3"} w-6 h-6`} />
                                        <span className='tracking-wider'>Memorial</span>
                                    </div>
                                </span>
                            </li>
                            <li className='hover:bg-transparent cursor-pointer p-[0_5px] w-[50%]' onClick={() => handleCauseChange("others")}>
                                <span className={`${cause === "others" ? " border-[#eaeaea] bg-[#691a47] text-[#fff] " : "bg-white text-[#282828]"} text-[20px] py-4 align-middle items-center rounded w-[100%] relative border-[1px] border-solid border-[#ecedee] flex `}>
                                    {cause === "others" && <AiOutlineCheck className='ml-3' />}
                                    <div className='flex'>
                                        <BsThreeDots size={20} className={`${cause !== "others" ? "ml-10 mr-3 text-[#9c3353]" : "text-white mx-3"} w-6 h-6`} />
                                        <span className='tracking-wider'>Others</span>
                                    </div>
                                </span>
                            </li>
                        </div>
                    </ul>
                </div> */}
                {/* medical */}
                {values.category === "medical"
                    && <div className='flex justify-center w-[80%] 800px:w-[40%] 800px:min-w-[400px] border p-4 shadow-[0_0_7px_rgba(31,156,51,.32549)]'>
                        <div className='my-5 space-y-10 text-gray-500'>
                            <div className='text-center'>
                                <span>I want to raise &#8377;</span>
                                <input value={values.amountRequired} onChange={(e) => setFieldValue('amountRequired', e.target.value, false)} type="number" id="amountRequired" className='flex-1 py-1 text-gray-600 border-b-2 border-gray-400 outline-none' />
                            </div>
                            <div className='flex justify-center'>
                                <span>by</span>
                                <div className='relative inline'>
                                    <input value={values.endDateToRaise} onChange={(e) => setFieldValue('endDateToRaise', e.target.value, false)} type="date" name="endDateToRaise" id="date"
                                        className="flex-1 px-2 py-1 text-black border-b-2 outline-none border-gray-40" />
                                    <p className='absolute text-[13px] top-[-16px] left-[-18px]'>End Date</p>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <div className='my-auto w-[70%] 600px:w-[50%] text-sm text-black'>Do you want donors to receive tax benefits for their donation?</div>
                                <div className='flex justify-center flex-col 600px:flex-row 600px:w-[40%] my-auto'>
                                    {/* <div className="ml-3" x-data="app"> */}
                                    <div>
                                        <input value="true" type="radio" id="Yes" className="hidden peer" onClick={() => setFieldValue('includeTaxBenefit', "true", false)} />
                                        <label htmlFor="Yes" className={(values.includeTaxBenefit == "true") ? "block p-2 px-8 600px:px-6 text-center cursor-pointer select-none bg-green-500 font-bold text-white" : "block px-8 600px:px-6 p-2 text-center cursor-pointer select-none"}>Yes</label>
                                    </div>
                                    <div>
                                        <input value="false" type="radio" id="No" className="hidden peer" onClick={() => setFieldValue('includeTaxBenefit', "false", false)} />
                                        <label htmlFor="No" className={(values.includeTaxBenefit == "false") ? "block p-2 px-8 600px:px-6 text-center cursor-pointer select-none bg-green-500 font-bold text-white" : "block px-8 600px:px-6 p-2 text-center cursor-pointer select-none"}>No</label>
                                    </div>
                                </div>
                            </div>
                            <div className='space-y-4'>
                                <p className='text-sm'>Hospital name, location and ailment will have to be provided in order to issue tax receipts to your donors</p>
                                <input value={values.hospitalName} onChange={(e) => setFieldValue('hospitalName', e.target.value, false)} type="text" name="hospitalName" id="Hname" className='flex-1 py-0.5 border-b-2 border-gray-400 text-gray-400 outline-none w-full' placeholder='Hospital Name' />
                                <input value={values.hospitalLocation} onChange={(e) => setFieldValue('hospitalLocation', e.target.value, false)} type="text" name="hospitalLocation" id="Hloc" className='flex-1 py-0.5 border-b-2 border-gray-400 text-gray-400 outline-none w-full' placeholder='Location (City) of the hospital' />
                                <input value={values.ailment} onChange={(e) => setFieldValue('ailment', e.target.value, false)} type="text" name="ailment" id="ailment" className='flex-1 py-0.5 border-b-2 border-gray-400 text-gray-400 outline-none w-full' placeholder='Ailment' />
                            </div>
                        </div>
                    </div>
                }

                {/* education and others */}
                {(values.category === "education" || values.category === "others")
                    && <div className='flex justify-center w-[80%] 800px:w-[40%] 800px:min-w-[400px] border p-4 shadow-[0_0_7px_rgba(31,156,51,.32549)]'>
                        <div className='my-5 space-y-10 text-gray-500'>
                            <div className='text-center'>
                                <span>I want to raise &#8377;</span>
                                <input value={values.amountRequired} onChange={(e) => setFieldValue('amountRequired', e.target.value, false)} type="number" id="amountRequired" className='flex-1 py-1 text-gray-600 border-b-2 border-gray-400 outline-none' />
                            </div>
                            <div className='flex justify-center'>
                                <span>by</span>
                                <div className='relative inline'>
                                    <input value={values.endDateToRaise} onChange={(e) => setFieldValue('endDateToRaise', e.target.value, false)} type="date" name="endDateToRaise" id="date"
                                        className="flex-1 px-2 py-1 text-black border-b-2 outline-none border-gray-40" />
                                    <p className='absolute text-[13px] top-[-16px] left-[-18px]'>End Date</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/* Memorial */}
                {values.category === "memorial" &&
                    <div className='flex justify-center w-[80%] 800px:w-[40%] 800px:min-w-[400px] border p-4 shadow-[0_0_7px_rgba(31,156,51,.32549)]'>
                        <div className='my-5 space-y-10 text-gray-500'>
                            <div className='text-center'>
                                <span>I want to raise &#8377;</span>
                                <input value={values.amountRequired} onChange={(e) => setFieldValue('amountRequired', e.target.value, false)} type="number" id="amountRequired" className='flex-1 py-1 text-gray-600 border-b-2 border-gray-400 outline-none' />
                            </div>
                            <div className='flex justify-center'>
                                <span>by</span>
                                <div className='relative inline'>
                                    <input value={values.endDateToRaise} onChange={(e) => setFieldValue('endDateToRaise', e.target.value, false)} type="date" name="endDateToRaise" id="date"
                                        className="flex-1 px-2 py-1 text-black border-b-2 outline-none border-gray-40" />
                                    <p className='absolute text-[13px] top-[-16px] left-[-18px]'>End Date</p>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <div className='my-auto w-[70%] 600px:w-[50%] text-sm text-black'>Do you want donors to receive tax benefits for their donation?</div>
                                <div className='flex justify-center flex-col 600px:flex-row 600px:w-[40%] my-auto'>
                                    <div>
                                        <input value="true" type="radio" id="Yes" className="hidden peer" onClick={() => setFieldValue('includeTaxBenefit', "true", false)} />
                                        <label htmlFor="Yes" className={(values.includeTaxBenefit == "true") ? "block p-2 px-8 600px:px-6 text-center cursor-pointer select-none bg-green-500 font-bold text-white" : "block px-8 600px:px-6 p-2 text-center cursor-pointer select-none"}>Yes</label>
                                    </div>
                                    <div>
                                        <input value="false" type="radio" id="No" className="hidden peer" onClick={() => setFieldValue('includeTaxBenefit', "false", false)} />
                                        <label htmlFor="No" className={(values.includeTaxBenefit == "false") ? "block p-2 px-8 600px:px-6 text-center cursor-pointer select-none bg-green-500 font-bold text-white" : "block px-8 600px:px-6 p-2 text-center cursor-pointer select-none"}>No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default Page3