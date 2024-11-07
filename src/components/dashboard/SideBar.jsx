"use client"
import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { TbCoinRupeeFilled } from 'react-icons/tb';
import { FaUserCircle } from "react-icons/fa";
import { LuWallet } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { PiHandCoinsFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { setShowSideBar } from '@/redux/slices/sidebarSlice';
import { setCurrentUser } from '@/redux/slices/authSlice';

const SideBar = () => {

    const dispatch = useDispatch()
    const {showSideBar} = useSelector((state)=>state.sidebar)
    const {currentUser,walletBalance} = useSelector((state)=>state.auth)

    return (
        <div className={showSideBar? 'absolute top-0 left-0 w-[250px] md:w-[400px] bg-black h-screen overflow-auto' : 'hidden'}>
            <div className='flex justify-end px-6 pt-6'>
                <RxCross2 onClick={()=>{
                    dispatch(setShowSideBar(false))
                }} className='text-2xl font-bold' />
            </div>
            <div className='w-full flex justify-center'>
                <div className='flex flex-col items-center'>
                    <div className='w-20 h-20 rounded-full bg-yellow-500 mb-3 flex justify-center items-center overflow-hidden'><FaUserCircle className='w-full h-full' /></div>
                    <span className='text-white font-bold'>{currentUser? currentUser.name : "User"}</span>
                    <span className='text-white mb-2 text-sm text-gray-300'>{currentUser? currentUser.email : "user@gmail.com"}</span>
                    <span className='flex items-center gap-1 border-[2px] border-yellow-400 px-6 py-1.5 rounded-full'>
                        <TbCoinRupeeFilled className='text-yellow-400 text-2xl' />
                        <span>{walletBalance}</span>
                    </span>
                </div>
            </div>
            <div className='px-1 py-4 flex flex-col gap-2 w-full'>
                <div className='px-4 py-3 w-full border-t-[1px] border-gray-400 flex items-center gap-2'>
                    <LuWallet className='text-2xl text-yellow-400' />
                    <div className='text-white'>My Wallet</div>
                </div>
                <div className='px-4 py-3 w-full border-t-[1px] border-gray-400 flex items-center gap-2'>
                    <PiHandCoinsFill className='text-2xl text-yellow-400' />
                    <div className='text-white'>Redeem Points</div>
                </div>
                <div className='px-4 py-3 w-full border-t-[1px] border-gray-400 flex items-center gap-2'>
                    <FaEdit className='text-2xl text-yellow-400' />
                    <div className='text-white'>Edit Profile</div>
                </div>
                <div className='px-4 py-3 w-full border-t-[1px] border-gray-400 flex items-center gap-2'>
                    <FiSettings className='text-2xl text-yellow-400' />
                    <div className='text-white'>Settings</div>
                </div>
                <div onClick={()=>{
                    localStorage.removeItem('token')
                    dispatch(setCurrentUser(null))
                    dispatch(setShowSideBar(false))
                }} className='px-4 py-3 w-full border-t-[1px] border-gray-400 flex items-center gap-2'>
                    <MdLogout className='text-2xl text-yellow-400' />
                    <div className='text-white'>Logout</div>
                </div>
            </div>
        </div>
    )
}

export default SideBar