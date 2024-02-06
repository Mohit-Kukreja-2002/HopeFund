"use client"
import React, { FC, useEffect, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Navbar from "../components/Navbar";
// import Profile from "../components/Profile/Profile.jsx";
// import { useSelector } from "react-redux";
import SetupFund from "../components/SetupFund/SetupFund";
import { redirect } from "next/navigation";
// import { useUpdateFundIDArrayMutation } from "@/redux/user/userApi";
// import Footer from "../components/Footer";


const Page = (props) => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const [success, setSuccess] = useState(false);
    // const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if(success){
            setSuccess(false);
            redirect('/profile')
        }
    },[success])

    return (
        <div className="min-h-screen">
            <Protected>
                <Heading
                    title="Create Fundraiser"
                    description="HopeFund is a platform for helping people raise funds for any need from a community of rich hearted individuals."
                    keywords="Funding,HopeFund,Raise Money,Fundraiser"
                />
                <Navbar
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                    page={page}
                />
                <div className="mt-20">
                    <SetupFund
                        page={page}
                        setPage={setPage}
                        setSuccess={setSuccess}
                    />
                </div>
                {/* <Footer /> */}
            </Protected>
        </div>
    );
};

export default Page;
