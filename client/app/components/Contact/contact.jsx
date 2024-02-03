import React from 'react'
import Image from 'next/image'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { AiFillMail } from 'react-icons/ai'
import { HiLocationMarker } from 'react-icons/hi'
const Contact = () => {
    return (
        <div className="z-0 mt-[2px]">
            <div className="1000px:flex items-center justify-center font-sans bg-contact bg-[#9c3353] pt-32 pb-20">
                <div className='flex flex-col justify-center w-full pb-5 pl-5 1000px:w-3/6 1000px:pl-40'>
                    <h1 className='text-[#ffffff] font-bold text-3xl'>Contact Us</h1>
                    <br />
                    <p className='text-[#ffffff] text-xl space-y-2'>We are here to help you and answer any questions you may have. Here is how to reach us!</p>
                </div>
                <div className='flex items-center justify-center 1000px:pr-60'>
                    <Image width={328} height={215} className='w-auto h-auto' src={"/assets/Contact.png"} alt="op" />
                </div>
            </div>
            <br />
            <div className="max-w-[1200px] m-auto p-10">
                <div>
                    <div >
                        <div className='flex  text-[#9c3353] py-4 mb-3 text-2xl max-w-[200px]'>
                            <span className='w-[50%]'><HiLocationMarker /></span>
                            <span className='w-[50%]'>
                                INDIA
                            </span>
                        </div>


                        <h3 >Indian Institute of Information Technology, Sonepat</h3>
                        <p>IIT Delhi Technopark (I-TEC) Plot No. 4B, RGEC, P O Rai, Sonipat, Haryana - 131029</p>
                    </div>
                    <div className='text-[#9c3353] underline'>
                        <div className="block m-2">
                            <AiFillMail className='inline-block mr-2 text-black' />
                            <a className='hover:hover:decoration-white' href="mailto:milaapiiit@gmail.com">milaapiiit@gmail.com</a>
                        </div>
                        <div className="block m-2">
                            <BsFillTelephoneFill className='inline-block mr-2 text-black' />
                            <a className='hover:decoration-white' href="tel:+919876543210">98765 43210</a>
                        </div>

                    </div>
                </div>
                <br />
            </div>
            <div class="w-full px-5 py-10 max-w-[1200px] m-auto">
                <iframe class="border-0 w-full" src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.1882199452075!2d77.09905287835032!3d28.95214131229869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390dadd1ccaa6249%3A0x79dedc8ba40cf3ac!2sIndian%20Institute%20Of%20Information%20Technology%20Sonepat!5e0!3m2!1sen!2sin!4v1681456888051!5m2!1sen!2sin"} width={1000} height={450} allowFullScreen={""} loading={"lazy"} referrerpolicy={"no-referrer-when-downgrade"}></iframe>
            </div>
            <div className='w-full px-5 py-10 max-w-[1200px] m-auto'>
                <h1 className='mb-10 text-2xl'>Let us know what you think</h1>
                <form action="">
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full 1000px:w-5/6 mb-6 group">
                            <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-lg text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div class="relative z-0 w-full 1000px:w-5/6 mb-6 group">
                            <input type="mail" name="mail" id="mail" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none 600 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label hmtlFor="mail" className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                    </div>
                    <div>
                        <textarea id="message" rows="4" className="block p-2.5 w-full h-40 text-lg text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="You can type any suggestions or queries you might have. Let us help you!"></textarea>
                    </div>
                    <br />
                    <button type="submit" className="text-white bg-[#9c3353] focus:ring-4 focus:outline-none font-medium rounded-3xl text-xl px-32 py-4 text-center">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Contact