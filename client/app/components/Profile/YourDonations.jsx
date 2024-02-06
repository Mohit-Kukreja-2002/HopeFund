import { useGetUserDonationsQuery } from '../../../redux/fund/fundApi'
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import coverImg from '../../../public/assets/medical.jpg';
import Loader from '../Loader/loader';

const YourDonations = ({ user }) => {
  const [client, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)
  }, [])
  const { data, isLoading, refetch } = useGetUserDonationsQuery();
  useEffect(() => {
    if (!data) {
      // console.log("refetching: ", data)
      refetch();
    }
  }, [refetch,data]);
  // useEffect(()=>{

  // },[data])

  return (
    <>
      {client && (
        (data===undefined || isLoading) ? (
          <div className='max-h-screen'>
            <Loader />
          </div>
        ) : (
          data && data.resArray.length === 0 ?
            <div className='w-full h-[300px] text-center'>
              <div className='mt-[50px]'>
                Your have not donated to any cause yet.
              </div>
              <div className="mx-auto my-4 flex justify-center items-center py-2
            w-[200px] h-[40px] rounded-3xl text-[20px] font-[500] bg-[#9c3353] hover:bg-[#b8355c] text-white">
                <Link href={'/donate'}>
                  Donate Now
                </Link>
              </div>
            </div>
            :
            // (
            <div className='w-full'>
              <div className='w-full text-center'>
                You have donated &#8377; {user.amountDonated}. Thank You very much!
                <hr className='mx-auto w-[80%]' />
              </div>
              <div className="w-full pl-6 800px:pl-10">
                <div className="items-center justify-around w-full mx-2 sm:ml-0">
                  <div className="w-full text-sm border-separate border-spacing-y-2">
                    <div className='hidden mt-4 600px:block'>
                      <div className='grid grid-cols-12'>
                        <div className='col-span-3'></div>
                        <div className='col-span-4'>Title</div>
                        <div className='col-span-3'>Donated</div>
                        <div className='col-span-2'>Date</div>
                      </div>
                    </div>
                    <div className='w-full'>
                      {data.resArray.map((fund) =>
                      (
                        <div className='my-auto' key={fund.date}>
                          <div className='grid grid-cols-12 mt-4'>
                            {/* {console.log(fund)} */}
                            <div className='col-span-3 mr-3 500px:mr-0'>
                              <Link href={`/fundraiser/${fund.id}`}>
                                <Image
                                  src={fund.coverImg?.url || coverImg}
                                  alt=""
                                  width={80}
                                  height={80}
                                  className="w-[60px] min-w-[60px] mx-auto h-[60px] cursor-pointer border-[3px] border-[#9c3353]"
                                />
                              </Link>
                            </div>
                            <div className='col-span-9 my-auto ml-4 600px:ml-0'>
                              <div className='block grid-cols-9 600px:grid'>
                                <div className='col-span-4 mx-1 mb-1'>{fund.title}</div>
                                <div className='col-span-3 mx-1 mb-1 600px:block'>₹{fund.amount}</div>
                                <div className='col-span-2 mb-1'>
                                  <div className='col-span-3 mb-1 ml-1 600px:block'>{fund.date.substring(0, fund.date.indexOf('T'))}</div>
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

          // )
        )
      )
      }
    </>
  )
}

export default YourDonations