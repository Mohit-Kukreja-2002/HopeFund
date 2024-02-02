'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Heading from '../utils/Heading';
import Donate from '../components/Donate/Donate';

const DonatePage = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(1);
    const [route, setRoute] = useState("Login");
    return (
        <>
            <Heading
                title="Donate - HopeFund"
                description="HopeFund is a platform for helping people raise funds for any need from a community of rich hearted individuals."
                keywords="Funding,HopeFund,Raise Money,Fundraiser"
            />
            <div className='mb-4'>
                <Navbar
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
            </div>
            {/* <div className='w-full h-full'> */}
                <Donate/>
            {/* </div> */}
        </>
    )
}

export default DonatePage