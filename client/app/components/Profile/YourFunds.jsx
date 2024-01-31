import { useGetUserFundsMutation } from '@/redux/fund/fundApi'
import { userFundArray } from '@/redux/fund/fundSlice';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import coverImg from '../../../public/assets/medical.jpg';


const YourFunds = ({ user }) => {
  const [funds, setFunds] = useState([]);
  let fundFromState = useSelector((state) => state.fund.funds);
  const [getFunds, { isSuccess, error }] = useGetUserFundsMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    getFunds({ createdFunds: user.createdFunds });
  }, [getFunds, user.createdFunds]);

  useEffect(() => {
    setFunds(fundFromState);
  }, [fundFromState])

  return (
    funds.length == 0 ?
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
      : (
        <div className='w-full'>
          <div className='w-full text-center'>
            Here's the status of your created funds
            <hr className='mx-auto w-[80%]' />
          </div>
          <div className="w-full pl-6 800px:px-10">
            <div className="flex items-center justify-around w-full mx-4 sm:ml-0">
              <table className="w-full text-sm border-separate border-spacing-y-2">
                <tbody >
                  <tr className="tr-class">
                    <td className="td-class"></td>
                    <td className="td-class">Title</td>
                    <td className="text-center max-w-[60px] td-class ">Amount Raised</td>
                    <td className="text-center td-class">Verfication</td>
                  </tr>
                  {funds.map((fund) =>
                  (
                    <tr className="tr-class" key={fund._id}>
                      {console.log(fund)}
                      <td className="td-class">
                        <Image
                          src={fund.coverImg.url || coverImg}
                          alt=""
                          width={60}
                          height={60}
                          className="w-[60px] mx-auto h-[60px] cursor-pointer border-[3px] border-[#9c3353]"
                        />
                      </td>
                      <td className="td-class">{fund.fundraiserTitle}</td>
                      <td className="max-w-[60px] text-center td-class">₹{fund.amountRaised}</td>
                      <td className="text-center td-class">
                        {fund.verified? 
                        <span className="px-4 py-2 mx-auto text-xs antialiased font-semibold text-green-900 uppercase rounded-xl bg-green-600/50">Verified</span>
                        :
                        <span className="px-4 py-2 mx-auto text-xs antialiased font-semibold text-red-100 uppercase rounded-xl bg-red-600/50">Pending</span>
                        }
                      </td>
                    </tr>
                  ))
                  }


                  {/* <tr class="tr-class">
                    <td class="td-class">Bilbo Baggins</td>
                    <td class="td-class">bbaggins@mail.com</td>
                    <td class="td-class">Thorin’s Company</td>
                    <td class="td-class">
                      <span class="float-right rounded-md bg-yellow-600/50 px-4 py-px text-xs font-semibold uppercase text-yellow-900 antialiased">Pending</span>
                    </td>
                  </tr>
                  <tr class="tr-class">
                    <td class="td-class suspended-text">Boromir of Gondor</td>
                    <td class="td-class suspended-text">boromir@mail.com</td>
                    <td class="td-class suspended-text">Fellowship of the Ring</td>
                    <td class="td-class">
                      <span class="float-right rounded-md bg-red-600/50 px-4 py-px text-xs font-semibold uppercase text-red-100 antialiased">Suspended</span>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )

  )
}

export default YourFunds