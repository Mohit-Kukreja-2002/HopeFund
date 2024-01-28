'use client'
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile/Profile.jsx";
import { useSelector } from "react-redux";
import SetupFund from "../components/SetupFund/SetupFund";
// import Footer from "../components/Footer";


const Page = (props) => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state) => state.auth);

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
                <SetupFund
                    page={page}
                    setPage={setPage}
                />
                {/* <Footer /> */}
            </Protected>
        </div>
    );
};

export default Page;
