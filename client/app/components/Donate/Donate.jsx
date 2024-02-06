'use client'
import React, { useState, useEffect } from 'react'
import { useGetAllFundsMutation, useGetFundsBySearchMutation } from '../../../redux/fund/fundApi';
import { useSelector } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';
import { AiOutlineSearch } from 'react-icons/ai';
import Loader from '../Loader/loader';
import FundraiserCard from '../../utils/FundraiserCard';

const Donate = () => {
    const [search, setSearch] = useState("");

    const [getFundsBySearch, { isSuccess: success, error: isError }] = useGetFundsBySearchMutation();
    const [getFunds, { isSuccess, error }] = useGetAllFundsMutation();

    const [fundsOfSearch, setFundsOfSearch] = useState([]);
    const [funds, setFunds] = useState([]);

    let fundsBySearch = useSelector((state) => state.fund.fundOfSearch);
    let allFundsOfUrgency = useSelector((state) => state.fund.allFundsOfUrgency);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        // console.log("getting funds..")
        getFunds();
    }, [getFunds]);

    useEffect(() => {
        setFunds(allFundsOfUrgency);
    }, [allFundsOfUrgency, setFunds])

    useEffect(() => {
        if (debouncedSearch.trim().length > 0) {
            getFundsBySearch({ search: debouncedSearch.trim() });
        }
    }, [debouncedSearch, getFundsBySearch]);

    useEffect(() => {
        setFundsOfSearch(fundsBySearch);
    }, [fundsBySearch])

    return (
        <div>
            {/* <div className='bottom-0 right-[70px] fixed z-[1000000]'> */}
            <div className="relative flex justify-center mx-4 mb-4">
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
            {/* </div> */}

            <div className='relative flex flex-wrap justify-center mx-6 mb-4 700px:mx-4 1300px:mx-24 1500px:mx-36 1100px:mx-16 1000px:mx-2'>
                {
                    debouncedSearch.trim().length === 0 && funds.length === 0 && 
                    <div className='h-[40px]'>
                        <Loader />
                    </div>
                }
                {
                    debouncedSearch.trim().length === 0 && funds.length > 0
                    && funds.map((fund) => (
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
                    && fundsOfSearch.map((fund) => (
                        <FundraiserCard fund={fund} key={fund._id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Donate;