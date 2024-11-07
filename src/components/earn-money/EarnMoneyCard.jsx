'use client'
import Image from 'next/image';
import React from 'react'
import { TbCoinRupeeFilled } from "react-icons/tb";


const EarnMoneyCard = () => {
    return (
        <div className='w-full max-w-[600px] m-auto shadow-lg px-2 py-3 md:p-3 rounded-md border-[2px] border-gray-200'>
            <div className='flex gap-6'>
                <div className='flex gap-2 grow'>
                    <div>
                        <div className='w-6 md:w-10 h-6 md:h-10 rounded-lg bg-red-600'>
                            <Image />
                        </div>
                    </div>
                    <div className='grow flex flex-col gap-1'>
                        <span className='text-sm'>Register on Mani-draw and get a chance to earn 500 coins</span>
                        <span className='text-xs text-gray-400'>Rewards will be credited within 24 hrs</span>
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <span className='flex justify-end pr-3 '>
                        <TbCoinRupeeFilled className='text-yellow-400 text-2xl' />
                        <span className='text-yellow-400'>+ 500</span>
                    </span>
                    <div className='w-[90px] md:w-[100px] border-[2px] border-red-400 text-red-500 rounded-full text-[12px] flex justify-center items-center px-4 py-1 uppercase'>
                        Register
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EarnMoneyCard