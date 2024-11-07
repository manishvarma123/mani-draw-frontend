'use client'
import React from 'react'
import { TbCoinRupeeFilled } from 'react-icons/tb'
import { GiTrophyCup } from "react-icons/gi";
import { FaTrophy } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '@/common';
import { setCurrentUser, setWalletBalance } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';
import { getAccessToken } from '@/lib/constants';
import { setDrawJoined } from '@/redux/slices/luckydrawSlice';
import { setShowPopUp } from '@/redux/slices/route';

const LuckyDrawCard = ({draw}) => {

    const dispatch = useDispatch()
    const now = new Date();

    const {currentUser} = useSelector((state)=>state.auth)

    // if (!currentUser) {
    //     return null; // Optionally, you could return a loading spinner here
    // }

    const alreadyJoined = draw.participants.some(
        (participant) => participant.userId.toString() === currentUser?._id
    );
    const hasJoined = draw.joined;

    const upcoming = new Date(draw.contestStartTime) > now;

    const completed = new Date(draw.winnerAnnounceTime) < now;

    const handleJoin = async() => {
        if (!currentUser){
            dispatch(setShowPopUp('login'))
            return;
        }
        if (hasJoined || alreadyJoined) {
            toast.error('You have already joined the contest');
            return;
        }
        try{
            const data = {
                userId : currentUser?._id,
                drawId : draw?._id
            };

            const response = await fetch(SummaryApi.joinDraw.url,{
                method : SummaryApi.joinDraw.method,
                headers : {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(data)
            });

            const json = await response.json();
            console.log(json)

            if(response.ok){
                dispatch(setWalletBalance(json?.walletBalance));
                dispatch(setDrawJoined(draw._id))
                toast.success(json.message || 'Successfully joined the contest')
            }else{
                throw new Error(json.message || 'failed to join')
            }

        }catch(err){
            toast.error(err.message || 'An error occur. Please try again')
        }
    }

  return (
    <div className='w-full max-w-[600px] m-auto shadow-lg px-2 py-3 md:p-3 rounded-md border-[2px] border-gray-200'>
            
            <div className='flex justify-between border-b-[1px] border-gray-200 pb-2'>
                <span className='text-sm font-bold text-[#999999]'>{draw?.name? draw.name : "---"}</span>
                <span className='text-sm text-gray-400'>Details</span>
            </div>
            <div className='flex gap-6 py-2 border-b-[1px] border-gray-50'>
                <div className='flex gap-2 grow'>
                    <div>
                        <div className='flex justify-center items-center w-6 md:w-10 h-6 md:h-10 rounded-lg pt-2'>
                            <FaTrophy className='text-yellow-400 text-2xl'/>
                        </div>
                    </div>
                    <div className='grow flex flex-col'>
                        <span className='flex items-center'>
                            <span className='text-2xl pl-3 font-bold'>{draw?.prizeAmount? draw.prizeAmount : "---"}</span>
                            <TbCoinRupeeFilled className='text-yellow-400 text-2xl' />
                        </span>
                        <span className='text-xs text-gray-400'>Rewards will be credited within 24 hrs</span>
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <span className='flex items-center gap-2'>
                        <span className='text-sm text-gray-400'>Entry: </span>
                        <span className='flex items-center gap-1'>
                            <span>{ draw?.entryFee===0 ? "Free" : draw?.entryFee? draw.entryFee : "---"}</span> 
                            <TbCoinRupeeFilled className={draw?.entryFee!==0 ? 'text-yellow-400 text-xl' : 'hidden'} />
                        </span>
                    </span>
                    <div onClick={handleJoin} className={`w-[90px] md:w-[100px] border-[2px] ${(hasJoined || alreadyJoined || upcoming || completed) ? 'bg-gray-400' : 'bg-green-600'} text-white rounded-md text-[12px] flex justify-center items-center px-4 py-1 font-bold cursor-pointer`} style={{ pointerEvents: (hasJoined || alreadyJoined || upcoming || completed ) ? 'none' : 'auto' }}>
                        {(hasJoined || alreadyJoined)?'Joined' : 'Join'}
                    </div>
                </div>
            </div>
            <div className='flex justify-between '>
                <div className='flex flex-col text-center'>
                    <span className='text-xs text-gray-400'>Winners</span>
                    <span className='text-sm'>75</span>
                </div>
                <div className='flex flex-col text-center'>
                    <span className='text-xs text-gray-400'>Joined</span>
                    <span className='text-sm'>{draw.participants.length}</span>
                </div>
                <div className='flex flex-col text-center'>
                    <span className='text-xs text-gray-400'>Contest Starts at </span>
                    <span className='text-sm'>06:00 PM, Today</span>
                </div>
                
            </div>
        </div>
  )
}

export default LuckyDrawCard