'use client'

import { setShowPage } from '@/redux/slices/route';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Menu = () => {
    const dispatch = useDispatch();
    const router = useRouter()

    const { showPage } = useSelector((state) => state.route)

    return (
        <div className='w-full shadow-md border-t-gray-300 border-[1px]'>
            <div className='grid grid-cols-4 text-center text-sm'>
                <div className={showPage === 'home' ? 'bg-[#fe7b02] text-white px-2 py-1.5 cursor-pointer' : ' hover:bg-[#fe7b02] hover:text-white duration-300 px-2 py-1.5 cursor-pointer hover:border-x-gray-300 hover:border-x-[1px]'}
                    onClick={() => {
                        dispatch(setShowPage('home'))
                        router.push('/')
                    }}>
                    Home
                </div>
                <div className={showPage === 'games' ? 'bg-[#fe7b02] text-white px-2 py-1.5 cursor-pointer' : ' hover:bg-[#fe7b02] hover:text-white duration-300 px-2 py-1.5 cursor-pointer hover:border-x-gray-300 hover:border-x-[1px]'}
                    onClick={() => {
                        dispatch(setShowPage('games'))
                        router.push('/games')
                    }}>
                    Game
                </div>
                <div className={showPage === 'lucky-draw' ? 'bg-[#fe7b02] text-white px-2 py-1.5 cursor-pointer' : ' hover:bg-[#fe7b02] hover:text-white duration-300 px-2 py-1.5 cursor-pointer hover:border-x-gray-300 hover:border-x-[1px]'}
                    onClick={() => {
                        dispatch(setShowPage('lucky-draw'))
                        router.push('/lucky-draw')
                    }}>
                    Lucky Draw
                </div>
                <div className={showPage === 'earn-money' ? 'bg-[#fe7b02] text-white px-2 py-1.5 cursor-pointer' : ' hover:bg-[#fe7b02] hover:text-white duration-300 px-2 py-1.5 cursor-pointer hover:border-x-gray-300 hover:border-x-[1px]'}
                    onClick={() => {
                        dispatch(setShowPage('earn-money'))
                        router.push('/earn-money')
                    }}>
                    Earn Money
                </div>

            </div>
        </div>
    )
}

export default Menu