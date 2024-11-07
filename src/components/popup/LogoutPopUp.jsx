"use client"
import { setCurrentUser } from '@/redux/slices/authSlice'
import { setShowPopUp } from '@/redux/slices/route'
import React from 'react'
import { useDispatch } from 'react-redux'

const LogoutPopUp = () => {
    const dispatch = useDispatch()
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-black/30 flex justify-center items-center p-4'>
        <div className='w-full max-w-[375px] h-[100px] bg-white border-[2px] shadow-xl border-y-gray-300 rounded-lg flex flex-col gap-2 min-h-[150px] p-4 '>
            <div className='w-full h-0 grow'>
                <span className='font-bold'>Confirm Logout</span>
                <p className='text-gray-700 text-sm mt-2'>Are you Sure you want to log out?</p>
            </div>
            <div className='flex justify-end gap-9 text-blue-800 text-sm font-bold'>
                <span className='cursor-pointer' onClick={()=>{
                    dispatch(setShowPopUp(""))
                }}>CANCEL</span>
                <span className='cursor-pointer' onClick={()=>{
                    localStorage.removeItem('token')
                    dispatch(setCurrentUser(null))
                    dispatch(setShowPopUp(""))
                }}>OK</span>
            </div>
            

        </div>
    </div>
  )
}

export default LogoutPopUp