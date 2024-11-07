'use client'
import SummaryApi from '@/common'
import LuckyDrawCard from '@/components/lucky-draw/LuckyDrawCard'
import LuckyDrawMenu from '@/components/lucky-draw/LuckyDrawMenu'
import { setShowDraws } from '@/redux/slices/luckydrawSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const LuckyDrawMain = () => {

  const dispatch = useDispatch()
  const { showDraws, drawStatus } = useSelector((state) => state.draw)
  const { currentUser } = useSelector((state) => state.auth)
  const now = new Date(); // Force UTC comparison

  const upcomingDraws = showDraws.filter((draw) => new Date(draw.contestStartTime) > now)
  const liveDraws = showDraws.filter((draw) => (new Date(draw.contestStartTime) < now && now < new Date(draw.winnerAnnounceTime))) // Filter for in between start times
  const completedDraws = showDraws.filter((draw) => new Date(draw.winnerAnnounceTime) < now) // Filter for past start times

  const fetchLuckyDraws = async () => {
    try {
      const response = await fetch(SummaryApi.getDraws.url);
      const data = await response.json();
      dispatch(setShowDraws(data?.data))
      // console.log(showDraws)
    } catch (err) {
      toast.error(err.message || 'failed to fetch lucky draw')
    }
  }

  useEffect(() => {
    fetchLuckyDraws()
  }, [drawStatus])

  return (

    <div className='w-full h-full grow flex flex-col '>
      <LuckyDrawMenu />
      
      <div className='px-3 py-3 h-0 grow overflow-auto scrollbar-thin'>
        <div className='flex flex-col gap-4 '>
          
          {
            drawStatus === 'upcoming' && (upcomingDraws.length > 0 ? (
              upcomingDraws.map((draw) => (
                <LuckyDrawCard key={draw._id} draw={draw} />
              ))
            ) : (
              <span>No Lucky Draw is available</span>
            ))
          }
          {
            drawStatus === 'live' && (liveDraws.length > 0 ? (
              liveDraws.map((draw) => (
                <LuckyDrawCard key={draw._id} draw={draw} />
              ))
            ) : (
              <span>No Lucky Draw is available</span>
            ))
          }
          {
            drawStatus === 'completed' && (completedDraws.length > 0 ? (
              completedDraws.map((draw) => (
                <LuckyDrawCard key={draw._id} draw={draw} />
              ))
            ) : (
              <span>No Lucky Draw is available</span>
            ))
          }
        </div>

      </div>

    </div>


  )
}

export default LuckyDrawMain