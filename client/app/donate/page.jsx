'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Heading from '../utils/Heading';
import Donate from '../components/Donate/Donate';
import Footer from '../components/Footer';

const DonatePage = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(1);
    const [route, setRoute] = useState("Login");
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        isClient && <>
            <Heading
                title="Donate - HopeFund"
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
            <div className='mt-24'>
                <Donate />
            </div>
            <Footer/>
        </>
    )
}

export default DonatePage