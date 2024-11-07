"use client"
import { setCurrentUser } from '@/redux/slices/authSlice'
import { setShowPage, setShowPopUp } from '@/redux/slices/route'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

const LoginPopUp = () => {
    const dispatch = useDispatch()
    const router = useRouter()
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-black/30 flex justify-center items-center p-4'>
        <div className='w-full max-w-[375px] h-[100px] bg-white border-[2px] shadow-xl border-y-gray-300 rounded-lg flex flex-col gap-2 min-h-[150px] p-4 '>
            <div className='w-full h-0 grow'>
                <span className='font-bold'>Confirm Login</span>
                <p className='text-gray-700 text-sm mt-2'>Please Login First to join the contest</p>
            </div>
            <div className='flex justify-end gap-4 text-blue-800 text-sm'>
                <span className='cursor-pointer border-[2px] border-gray-300 px-3 py-1 rounded-md' onClick={()=>{
                    dispatch(setShowPopUp(""))
                }}>CANCEL</span>
                <span className='cursor-pointer border-[2px] border-green-600 px-3 py-1 rounded-md text-white bg-green-500' onClick={()=>{
                    dispatch(setShowPopUp(""))
                    dispatch(setShowPage('login'))
                    router.push('./login')
                }}>LOGIN</span>
            </div>
            

        </div>
    </div>
  )
}

export default LoginPopUp