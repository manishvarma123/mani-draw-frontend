'use client'
import { setDrawStatus } from '@/redux/slices/luckydrawSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const LuckyDrawMenu = () => {

  const dispatch = useDispatch()
  const {drawStatus} = useSelector((state)=>state.draw)

  return (
    <div className='w-full'>
        <div className='flex justify-center gap-6 p-2 font-bold text-gray-400'>
            <span onClick={()=>dispatch(setDrawStatus('upcoming'))} className={`${drawStatus === 'upcoming' ? 'underline underline-offset-2 text-[#fe7b02]' : ''} cursor-pointer`}>Upcoming</span>
            <span onClick={()=>dispatch(setDrawStatus('live'))} className={`${drawStatus === 'live' ? 'underline underline-offset-2 text-[#fe7b02]' : ''} cursor-pointer`}>Live</span>
            <span onClick={()=>dispatch(setDrawStatus('completed'))} className={`${drawStatus === 'completed' ? 'underline underline-offset-2 text-[#fe7b02]' : ''} cursor-pointer`}>Completed</span>
        </div>
    </div>
  )
}

export default LuckyDrawMenu