'use client'
import Heading from '../utils/Heading'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import Contact from '../components/Contact/contact'
import Footer from '../components/Footer'

const ContactUs = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(2);
    const [route, setRoute] = useState("Login");

    return (
        <div className="min-h-screen">
            <Heading
                title={`Contact - HopeFund`}
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
            <div className='mt-[82px]'>
                <Contact />
            </div>
            <Footer/>
        </div>
    )
}

export default ContactUs;