'use client'
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile/Profile.jsx";
import { useSelector } from "react-redux";
// import Footer from "../components/Footer";


const Page = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(6);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="min-h-screen">
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
                <Profile user={user} />
                {/* <Footer /> */}
            </Protected>
        </div>
    );
};

export default Page;
