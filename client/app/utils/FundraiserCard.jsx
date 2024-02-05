import React from 'react'
import img from '../../public/assets/medical.jpg'
import Link from 'next/link'
import Image from 'next/image'
import CircularProgressBar from './CircularProgressBar'
const FundraiserCard = ({fund}) => {
    return (
        <>
            <div className="cursor-pointer mx-3 mb-5 hover:shadow-[0_0_20px_0_rgba(156,51,83,0.3)] 
                shadow-[0_0_30px_0_rgba(156,51,83,0.2)] w-[300px] bg-white border border-gray-200 rounded-lg relative">
                <Link href={`/fundraiser/${fund?._id}`}>
                    {fund.includeTaxBenefit === "true" &&
                        <div className="absolute top-0 left-[-5px] px-2 py-1 bg-[#9c3353] text-white rounded-tr-lg rounded-bl-lg transform overflow-hidden">Tax Benefit</div>
                    }

                    <Image
                        className="w-[100%] h-[220px] rounded-t-lg"
                        src={fund.coverImg?.url || img}
                        width={200}
                        height={200}
                        alt="" />
                    <div className="px-5 mt-5 mb-2">
                        <h5 className="text-[18px] font-[500] tracking-tight text-gray-500">{fund.fundraiserTitle}</h5>
                    </div>

                    <div className='flex px-3'>
                        <div>
                            <CircularProgressBar
                                percentage={
                                    (Math.ceil(100 * (fund.amountRaised / fund.amountRequired)) <= 100)
                                    ? Math.ceil(100 * (fund.amountRaised / fund.amountRequired))
                                    : 100}
                            />
                        </div>
                        <div className='mt-4'>
                            <p className='text-[#71737B] text-sm font-bold'>Raised</p>
                            <p className='mt-1 text-xl'>₹{fund.amountRaised}</p>
                        </div>
                        <div className='relative flex mx-auto before:bg-[#dde0e0] before:content-[""] before:absolute before:h-[30%] before:w-[2px] before:left-[-12px] before:top-[26px]'>
                            <div className='mt-5'>
                                <p className='text-[#71737B] text-xs'>Created By</p>
                                <p className='mt-1 text-[#53545a] text-sm'>{fund.createdBy}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`mt-3 mb-4 mx-5 bg-[#f7f7f7] text-[#2b2b35] p-2`}>
                        <p className='relative before:absolute before:content-[""] before:bg-[#691a47] text-sm ml-2 before:h-[136%] before:top-[-8px] before:w-[4px] before:left-[-16px]'>
                            {fund.includeTaxBenefit === "true"
                                ? `Recieve Tax benefit by contributing to this cause.`
                                : `HopeFund will match the same amount donated by you.`
                            }
                        </p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default FundraiserCard