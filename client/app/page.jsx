"use client";
import React, { useState } from "react";
import Heading from "./utils/Heading";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FundRaiseLanding from "./components/Fundraisers/FundRaiseLanding";
import Footer from "./components/Footer";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <>
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
