"use client"

import React, { useEffect } from 'react'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { GiTwoCoins } from "react-icons/gi";
import SideBar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSideBar } from '@/redux/slices/sidebarSlice';
import { useRouter } from 'next/navigation'
import { setShowPage, setShowPopUp } from '@/redux/slices/route';
import { setCurrentUser } from '@/redux/slices/authSlice';
import LogoutPopUp from '../popup/LogoutPopUp';


const NavBar = () => {

  const dispatch = useDispatch()
  const router = useRouter()
  const { showSideBar } = useSelector((state) => state.sidebar);
  const { currentUser,walletBalance } = useSelector((state) => state.auth)
  const { showPopup } = useSelector((state) => state.route)

  return (
    <>
      <div>
        <nav>
          <div className='w-screen h-full shadow-md bg-gradient-to-r from-60% from-[#fe7b02] to-black text-white'>
            <div className="w-full max-w-[1240px] m-auto relative">

              <div className='flex items-center gap-4'>

                <div className='pl-3 flex items-center gap-2 bg-[#fe7b02]'>
                  <div className='text-lg' onClick={() => {
                    dispatch(setShowSideBar(true))
                  }}><HiMiniBars3CenterLeft className='text-2xl' /></div>
                  <div className='text-lg grow'>mani-draw</div>
                </div>

                <div className='h-full py-3 pr-3 grow flex items-center justify-end gap-2 bg-black'>
                  <span className={currentUser ? 'current px-5 h-10 flex justify-center items-center border-[2px] border-yellow-400 rounded-full' : 'hidden'}>
                    <span className='flex justify-center items-center gap-2'>
                      <GiTwoCoins className='text-yellow-400 text-2xl' />
                      <span>{walletBalance}</span>
                    </span>
                  </span>

                  <span className={currentUser ? 'hidden' : 'w-28 h-10 flex justify-center items-center border-[2px] border-yellow-400 bg-[#fe7b02] rounded-full cursor-pointer'} onClick={() => {
                    dispatch(setShowPage('register'))
                    router.push('./register')
                  }}>Register</span>

                  <span className={currentUser ? 'hidden' : 'w-20 h-10 flex justify-center items-center border-[2px] border-yellow-400 rounded-full cursor-pointer'} onClick={() => {
                    dispatch(setShowPage('login'))
                    router.push('./login')
                  }}>Login</span>

                  <span className={currentUser ? 'w-20 h-10 flex justify-center items-center cursor-pointer border-[2px] border-yellow-400 rounded-full' : 'hidden'} onClick={() => {
                    // localStorage.removeItem('token')
                    // dispatch(setCurrentUser(null))
                    dispatch(setShowPopUp("logout"))
                  }}>Logout</span>

                  {/* {showPopup === 'logout' && <LogoutPopUp />} */}
                </div>

              </div>
              <SideBar />

            </div>
          </div>
        </nav>


      </div>



    </>

  )
}

export default NavBar