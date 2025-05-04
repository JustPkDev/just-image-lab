import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
    return (
        <div className='w-full h-[50px] flex justify-center items-center bg-[#8c00d85d] '>
            <p className='text-white text-[12px] text-center max-sm:w-[60%] '>
                CopyRight 2025 | Designed And Developed By <Link to='https://justpkdev.vercel.app/' target='_blank' className='text-purple-500 border-b'>Muhammad Awais ( JustPkDev )</Link>
            </p>
        </div>
    )
}

export default Footer