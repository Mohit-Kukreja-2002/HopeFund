'use client'
import FundraiserCard from "../../utils/FundraiserCard"
import { useGetFundsBySearchMutation, useGetFundsByTypeMutation } from '@/redux/fund/fundApi'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaHandHoldingHeart, FaStethoscope } from 'react-icons/fa'
import { GiCandleLight } from 'react-icons/gi'
import Loader from '../Loader/loader'
import { useSelector } from 'react-redux'
import useDebounce from "../../hooks/useDebounce"
import Link from 'next/link'

const FundRaiseLanding = () => {
    const [selected, setSelected] = useState("medical");
    const [cards, setCards] = useState(getCards());
    const [search, setSearch] = useState("");
    const [funds, setFunds] = useState([]);
    const [fundsOfSearch, setFundsOfSearch] = useState([]);

    const [getFundsByType, { isSuccess, error }] = useGetFundsByTypeMutation();
    const [getFundsBySearch, { isSuccess: success, error: isError }] = useGetFundsBySearchMutation();

    const debouncedSearch = useDebounce(search, 500);

    let fundsByType = useSelector((state) => state.fund.fundOfType);
    let fundsBySearch = useSelector((state) => state.fund.fundOfSearch);

    useEffect(() => {
            getFundsByType({ type: selected });
    }, [getFundsByType, selected]);

    useEffect(() => {
        if(debouncedSearch.trim().length > 0 ){
            getFundsBySearch({ search: debouncedSearch.trim() });
        }
    }, [debouncedSearch, getFundsBySearch]);

    useEffect(() => {
        setFunds(fundsByType);
    }, [fundsByType])

    useEffect(() => {
        setFundsOfSearch(fundsBySearch);
    }, [fundsBySearch])


    useEffect(() => {
        function handleResize() {
            setCards(getCards());
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function getCards() {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            if (width >= 1000) {
                return 6;
            } else if (width >= 700) {
                return 4;
            } else {
                return 3;
            }
        } else {
            return 6;
        }
    }

    return (
        <>
            <div className='mt-8 mb-5'>
                <h1 className='text-[#212121] mx-4 text-2xl text-center mb-5'>Thousands are fundraising online on HopeFund</h1>
                <p className='text-center leading-[0.5] m-0 mb-2 text-[#5d5d5d]'>
                    <span className='inline-block relative before:content-[""] before:right-[100%] 
                        before:mr-[54px] before:absolute before:h-[5px] before:border-b-[1px] before:border-solid before:border-[#707070] before:top-[5px] before:w-[80px] 500px:before:w-[120px] before:opacity-[0.53] 
                        after:content-[""] after:left-[100%] after:ml-[54px] after:absolute after:h-[5px] after:border-b-[1px] after:border-solid after:border-[#707070] after:top-[5px] after:w-[80px] 500px:after:w-[120px] after:opacity-[0.53]'>
                        <span className='inline-block relative w-[18px] h-[18px] bg-[#b8385e] rotate-45 
                            before:top-[27px] before:left-[-21px] before:content-[""] before:absolute before:bg-[#691a47] before:w-[11px] before:h-[11px] before:opacity-[0.53] 
                            after:top-[-21px] after:right-[-21px] after:content-[""] after:absolute after:bg-[#691a47] after:w-[11px] after:h-[11px] after:opacity-[0.53]'></span>
                    </span>
                </p>
            </div>
            <div className="relative flex justify-center mx-4 mb-8">
                <input type="text"
                    onChange={(e) => { setSearch(e.target.value) }}
                    className="inline-block min-h-[auto] max-w-[600px] w-[90%] rounded-tl-full rounded-bl-full border-2 bg-transparent py-[0.32rem] px-5 leading-[2.15] outline-none border-[#9c3353] shadow-[0_0_30px_0_rgba(156,51,83,0.2)]"
                    value={search}
                    id="search" name='search'
                    placeholder="Search by fundraiser name, title, location, cause or other keywords"
                />
                <button
                    className='bg-[#9c3353] px-4 rounded-tr-full rounded-br-full'>
                    <AiOutlineSearch color='white' size={30} />
                </button>
            </div>
            {
                debouncedSearch.trim().length === 0 &&
                <div className='flex justify-center mb-12'>
                    <div
                        onClick={() => { setSelected("medical") }}
                        className={`cursor-pointer flex flex-col ${selected === "medical" ? "bg-[#691a47] text-white" : "text-black bg-white"} justify-center items-center 
                    700px:h-[150px] 700px:w-[200px] w-[130px] h-[110px] mx-2 shadow-[0_0_30px_0_rgba(156,51,83,0.2)] rounded-md text-[15px] font-semibold peer`}>
                        <FaStethoscope
                            size={50}
                            className={`my-4 ${selected === "medical" ? "text-white" : "text-black"}`} />
                        Medical
                    </div>
                    <div
                        onClick={() => { setSelected("memorial") }}
                        className={`cursor-pointer flex flex-col ${selected === "memorial" ? "bg-[#691a47] text-white" : "text-black bg-white"} justify-center items-center 
                    700px:h-[150px] 700px:w-[200px] w-[130px] h-[110px] mx-2 shadow-[0_0_30px_0_rgba(156,51,83,0.2)] rounded-md text-[15px] font-semibold peer`}>
                        <GiCandleLight
                            size={50}
                            className={`my-4 ${selected === "memorial" ? "text-white" : "text-black"}`} />
                        Memorial
                    </div>
                    <div
                        onClick={() => { setSelected("non-profit") }}
                        className={`cursor-pointer flex flex-col ${selected === "non-profit" ? "bg-[#691a47] text-white" : "text-black bg-white"} justify-center items-center 
                    700px:h-[150px] 700px:w-[200px] w-[130px] h-[110px] mx-2 shadow-[0_0_30px_0_rgba(156,51,83,0.2)] rounded-md text-[15px] font-semibold peer`}>
                        <FaHandHoldingHeart
                            size={50}
                            className={`my-4 ${selected === "non-profit" ? "text-white" : "text-black"}`} />
                        Non-Profit
                    </div>
                </div>
            }

            <div className='flex flex-wrap justify-center mx-6 mb-4 700px:mx-4 1300px:mx-24 1500px:mx-36 1100px:mx-16 1000px:mx-2'>
                {
                    debouncedSearch.trim().length === 0 
                    && funds.length === 0 
                    &&  <Loader height={60} />
                }
                {
                    debouncedSearch.trim().length === 0 && funds.length > 0
                    && funds.slice(0, cards).map((fund) => (
                        <FundraiserCard key={fund._id} fund={fund} />
                    ))
                }
                {
                    debouncedSearch.trim().length !== 0 && fundsBySearch.length === 0 && <div className='flex justify-center text-4xl'>
                        No funds match your search
                    </div>
                }
                {
                    debouncedSearch.trim().length !== 0 && fundsBySearch.length > 0
                    && fundsOfSearch.slice(0, cards).map((fund) => (
                        <FundraiserCard fund={fund} key={fund._id} />
                    ))
                }

            </div>

            <div className='flex items-center justify-center mb-4 underline font-bold text-[20px] text-[#9c3353]'>
                <Link href={'/donate'} className='cursor-pointer' >
                    See more fundraisers
                </Link>
            </div>
        </>
    )
}

export default FundRaiseLanding;