"use client";
import React, { FC, useEffect, useState } from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { useSelector } from 'react-redux'
import { useFormik } from "formik";

const schema = Yup.object().shape({
    // Page 1
    category : Yup.string().required(),
    creatorMail: Yup.string().email("Invalid email!"),
    createdBy: Yup.string(),

    // Page 2
    benefitter: Yup.string(),
    benefitterImg : Yup.object().shape({
        public_id: String,
        url: String,
    }),
    benefitterCreatorRelation: Yup.string(),
    benefitterName: Yup.string(),
    benefitterAge: Yup.number(),
    benefitterGender: Yup.string(),
    benefitterAddress: Yup.string(),
    benefitterContact: Yup.string(),

    // Page 3
    amountRequired: Yup.string(),
    endDateToRaise: Yup.date(),
    includeTaxBenefit: Yup.string(),
    hospitalName: Yup.string(),
    hospitalLocation: Yup.string(),
    ailment: Yup.string(),


    fundraiserTitle : Yup.string(),
    fundraiserStory : Yup.string(),
    coverImg: Yup.object().shape({
        public_id: String,
        url: String,
    }),
});


const SetupFund = ({ page, setPage}) => {
    const { user } = useSelector((state) => state.auth);
    const backImg = require('../../../public/assets/fixedbottom.png')
    const [scroll, setScroll] = useState(false);
    // console.log(user);

    const formik = useFormik({
        initialValues: { 
            category: "medical", creatorMail: user.email, createdBy: user.name,
            benefitter: "", benefitterCreatorRelation:"", benefitterName:"", benefitterAge: "", benefitterGender: "Male",
            benefitterImg:{public_id:"",url:""}, 
            benefitterContact:"", benefitterAddress:"",
            amountRequired:"",endDateToRaise:Date.now(), includeTaxBenefit:"false",
            hospitalLocation:"", hospitalName:"", ailment:"",
            fundraiserStory:"", fundraiserTitle:"", coverImg:{public_id:"",url:""},
        },
        validationSchema: schema,
        //  {values.category, creatorMail, createdBy},
        onSubmit: async ({values}) => {
            // const data ={values};
            // await cr( data );
        },
    });

    const { errors, touched, values, handleChange, handleSubmit, setFieldValue } = formik;

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
                {page === 1 && (
                    <div className="w-full h-full bg-transparent mt-[30px]">
                        <Page1 setFieldValue={setFieldValue} values={values}/>
                    </div>
                )}
                {page === 2 && (
                    <div className="w-full h-full bg-transparent mt-[30px]">
                        <Page2 setFieldValue={setFieldValue} user={user} values={values}/>
                    </div>
                )}
                {page === 3 && (
                    <div className="w-full h-full bg-transparent mt-[30px]">
                        <Page3 setFieldValue={setFieldValue} values={values} />
                    </div>
                )}
                {page === 4 && (
                    <div className="w-full h-full bg-transparent mt-[30px]">
                        <Page4 setFieldValue={setFieldValue} values={values} />
                    </div>
                )}
            </div>
            <div className='fixed bottom-0 w-[100%] z-[1000] flex justify-center items-center'>
                <div className='selection:max-h-[80px] max-w-[700px] w-[80%] min-w-[300px] p-[10px_30px] relative bg-[linear-gradient(0deg,#9c3353,#5f2747)] items-center'>
                    <Image
                        className='left-[120px] absolute top-[4px] '
                        width={40}
                        height={40}
                        src={backImg}
                        alt="temp"
                    />

                    <div className="flex">
                        <div className="">
                            {page > 1 && <button onClick={() => setPage(page - 1)} className='w-fit ml-5 underline underline-offset-4 text-white py-2 text-[15px] '>Back</button>}
                        </div>
                        <div className="ml-auto">
                            {page > 0 && <button className={` text-white mr-2 600px:mr-4 py-2 text-[15px] underline underline-offset-4`}><Link href={'/'}>Close</Link></button>}
                            {page === 4 &&
                                <button onClick={handleSubmit} className='rounded-full mr-2 600px:mr-4 w-[90px] 800px:w-[120px] text-[#9c3353] py-2 bg-[#fff] text-[15px] '>Submit</button>
                            }{page !== 4 &&
                                <button onClick={() => setPage(page + 1)} className='rounded-full mr-2 600px:mr-4 w-[90px] 800px:w-[120px] text-[#9c3353] py-2 bg-[#fff] text-[15px] '>Continue</button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetupFund;
