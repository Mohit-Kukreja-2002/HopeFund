'use client'
import React, { useEffect, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile/Profile.jsx";
import { useDispatch, useSelector } from "react-redux";
// import Footer from "../components/Footer";
import { useRouter } from 'next/router';
import { fundRegistration } from "../../redux/fund/fundSlice";
// import { useUpdateFundIDArrayMutation } from "@/redux/user/userApi";
import Footer from "../components/Footer";
const Page = (props) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(6);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state) => state.auth);
    const activeI = useSelector((state) => state.fund.active);
    const [active, setActive] = useState(activeI || 1);
    dispatch(fundRegistration({ active: 1 }))
    return (
        <div className="flex flex-col h-screen">
            <Protected>
                <Heading
                    title={`${user?.name} profile`}
                    description="HopeFund is a platform for helping people raise funds for any need from a community of rich hearted individuals."
                    keywords="Funding,HopeFund,Raise Money,Fundraiser"
                />
                <Navbar
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
                <div className="mt-20">
                    <Profile user={user} active={active} setActive={setActive} />
                </div>
                <div className="mt-auto z-[1000000]">
                    <Footer />
                </div>
            </Protected>
        </div>
    );
};

export default Page;
