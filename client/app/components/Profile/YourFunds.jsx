import { useGetUserFundsQuery } from '../../../redux/fund/fundApi'
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import coverImg from '../../../public/assets/medical.jpg';
import Loader from '../Loader/loader';

const YourFunds = ({ user }) => {
  const [client, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)
  }, [])
  const { data, isLoading, refetch } = useGetUserFundsQuery();
  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [refetch,data]);

  return (
    <>
      {client && (
        (data === undefined || isLoading) ? (
          <div className='max-h-screen'>
            <Loader />
          </div>
        ) : (
          data &&
          (data.resArray.length === 0 ?
            <div className='w-full h-[300px] text-center'>
              <div className='mt-[50px]'>
                Your have not created any fundraiser. Create one...
              </div>
              <div className="mx-auto my-4 flex justify-center items-center py-2
            w-[200px] h-[40px] rounded-3xl text-[20px] font-[500] bg-[#9c3353] hover:bg-[#b8355c] text-white">
                <Link href={'/createFund'}>
                  Create a fundraiser
                </Link>
              </div>
            </div>
            :
            <div className='w-full'>
              <div className='w-full text-center'>
                Here's the status of your created funds
                <hr className='mx-auto w-[80%]' />
              </div>
              <div className="w-full pl-6 800px:px-10">
                <div className="items-center justify-around w-full mx-4 sm:ml-0">
                  <div className="w-full text-sm border-separate border-spacing-y-2">
                    <div className='hidden mt-4 600px:block'>
                      <div className='grid grid-cols-12'>
                        <div className='col-span-3'></div>
                        <div className='col-span-4'>Title</div>
                        <div className='col-span-3'>Amount Raised</div>
                        <div className='col-span-2'>Verification</div>
                      </div>
                    </div>
                    <div>
                      {data.resArray.map((fund) =>
                      (
                        <div className='my-auto' key={fund._id}>
                          <div className='grid grid-cols-12 mt-4'>
                            {/* {console.log(fund)} */}
                            <div className='col-span-3 mr-4 500px:mr-0'>
                              <Image
                                src={fund.coverImg?.url || coverImg}
                                alt=""
                                width={80}
                                height={80}
                                className="w-[60px] min-w-[60px] mx-auto h-[60px] cursor-pointer border-[3px] border-[#9c3353]"
                              />
                            </div>
                            <div className='col-span-9 my-auto ml-4 600px:ml-0'>
                              <div className='block grid-cols-9 600px:grid'>
                                <div className='col-span-4 mx-1 mb-1'>{fund.fundraiserTitle}</div>
                                {fund.verified ?
                                  <div className='col-span-3 mx-1 mb-1'>₹{fund.amountRaised}</div>
                                  :
                                  <div className='hidden col-span-3 mx-1 mb-1 600px:block'>₹{fund.amountRaised}</div>
                                }

                                <div className='col-span-2 mb-1'>
                                  {fund.verified ?
                                    <span className="hidden px-4 py-2 mx-auto text-xs antialiased font-semibold text-green-900 uppercase 600px:inline-block rounded-xl bg-green-600/50">Verified</span>
                                    :
                                    <span className="px-4 py-1 mx-auto text-xs antialiased font-semibold text-red-100 uppercase 600px:py-2 rounded-xl bg-red-600/50">Pending</span>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )
      )
      }
    </>
  )
}

export default YourFunds