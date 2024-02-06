'use client'
import { useAddCoverImgMutation, useDeletCoverImgMutation } from '../../../redux/fund/fundApi';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import coverImg from '../../../public/assets/medical.jpg'
import { AiOutlineCamera } from 'react-icons/ai';
import Image from 'next/image';
import dynamic from 'next/dynamic'; 
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Page4 = ({ values, setFieldValue }) => {
    const [deleteCover, { isSuccess, error: isError }] = useDeletCoverImgMutation();
    const [addCover, { isSuccess: success, error }] = useAddCoverImgMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("image added successfully");
        }
        if (isError) {
            toast.error("Please try again");
        }
    }, [isSuccess, isError]);

    const imageHandler = async (e) => {
        const fileReader = new FileReader();

        fileReader.onload = async () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result;
                let prevAvatar = values.coverImg.public_id;
                let response = await addCover(avatar);
                response = response.data;
                if (response.success) {
                    values.coverImg.public_id = response.ans.public_id;
                    values.coverImg.url = response.ans.url;
                    if (prevAvatar != '') {
                        deleteCover(prevAvatar);
                    } else {
                        toast.success("image added successfully");
                    }
                } else {
                    toast.error("Please try again");
                }
            }
        };
        fileReader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='text-[#282828] border-[1.5px] mb-10 border-solid border-[#e0e1e3] tracking-widest text-[16px] p-[10px_0] bg-[hsla(210,4%,89%,.2)] w-[200px] text-center '>Elaborate Cause</div>
            <div className="relative">
                <Image
                    src={values.coverImg.url || coverImg}
                    alt=""
                    width={200}
                    height={200}
                    className="w-[300px] h-[180px] 500px:w-[380px] 500px:h-[220px] cursor-pointer border-[3px] border-[#9c3353] rounded-xl"
                />
                <input
                    type="file"
                    name=""
                    id="avatar"
                    className="hidden"
                    onChange={imageHandler}
                    accept="image/png,image/jpg,image/jpeg,image/webp"
                />
                <label htmlFor="avatar">
                    <div className="w-[30px] text-white h-[30px] bg-[#9c3353] rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                        <AiOutlineCamera size={20} className="z-1" />
                    </div>
                </label>
            </div>
            <div className='mt-8 pb-16 p-8 w-[90%] min-w-[340px] 500px:w-[480px] items-center border-solid border-2 border-[#beb0b4] mb-10 rounded-3xl overflow-hidden shadow-2xl'>
                <div>
                    <p className='text-center'>Name your fundraiser</p>
                    <input onChange={(e) => setFieldValue('fundraiserTitle', e.target.value, false)} value={values.fundraiserTitle} type="text" name="fundraiserTitle" id="title" className='flex-1 w-full p-2 py-1 text-sm text-center text-gray-600 border-b-2 border-gray-400 outline-none align-centre' placeholder="Eg: Give Your Fundraiser a title." />
                </div>
                <div className='p-1 mt-4 bg-gray-500 rounded-xl'>
                    <div className='pb-10 m-1 bg-white rounded-lg'>
                        <ReactQuill className='m-0 h-[300px] placeholder:text-gray-400'
                            value={values.fundraiserStory}
                            name="fundraiserStory"
                            onChange={(value) => setFieldValue('fundraiserStory', value, false)}
                            placeholder="Write your story. Keep it simple, personal, and about the specific use of funds. Write about: Who is this fundraiser for? When do you need funds? How do you plan to use the funds?"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page4