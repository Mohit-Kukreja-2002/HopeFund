"use client";
import React, { useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FundRaiseLanding from "./components/Fundraisers/FundRaiseLanding";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { userRedirection } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const [isClient, setIsClient] = useState(false)
  const dispatch = useDispatch();

  const { redirection } = useSelector((state) => state.auth);
  useEffect(() => {
    if (redirection === true && isClient) {
      toast.error("Please login to proceed...", {
        duration: 3000,
      });
      dispatch(userRedirection({ redirection: false }));
    }
  }, [isClient,dispatch,redirection]);

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    isClient && <>
      <Heading
        title="HopeFund"
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
        <Hero />
      </div>
      <FundRaiseLanding />
      <div className="mt-6">
        <Footer />
      </div>
    </>
  );
}
