'use client'

import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Menu from './Menu'
import LogoutPopUp from '../popup/LogoutPopUp'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '@/services/auth'
import { setCurrentUser, setWalletBalance } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import LoginPopUp from '../popup/LoginPopup'


const Dashboard = ({ children }) => {

  const dispatch = useDispatch()
  const router = useRouter()

  const { showPopUp } = useSelector((state) => state.route)
  const { currentUser } = useSelector((state) => state.auth)

  const handleCurrentUser = async () => {
    const currentUserResponse = await getCurrentUser();
    const currentUserResults = await currentUserResponse?.json();
    return currentUserResults?.data || null;
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!currentUser) {
        const user = await handleCurrentUser();
        dispatch(setCurrentUser(user));
        dispatch(setWalletBalance(user?.walletBalance));
      }
    };

    fetchCurrentUser();


    if (currentUser) {
      router.push(`/`);
    }

  }, [dispatch, currentUser]);

  return (
    <div className='w-screen h-screen flex flex-col grow'>
      <NavBar />

      <div className='w-full h-0 grow flex flex-col max-w-[1240px] m-auto  shadow-[gray] shadow-md '>
        <Menu />
        <div className='w-full h-0 grow overflow-auto scrollbar-thin'>
          {children}
        </div>

        {showPopUp === "logout" && <LogoutPopUp />}
        {showPopUp === "login" && <LoginPopUp />}


      </div>
    </div>
  )
}

export default Dashboard