'use client'
import React from 'react'
import Dashboard from '../dashboard/Dashboard'
import { TbCoinRupeeFilled } from 'react-icons/tb'
import GameCard from '../game/GameCard'

const GameMain = () => {
  return (
    
      <div className='w-full h-full p-3 overflow-auto'>
        <div className='w-full flex flex-col gap-4 '>
          <GameCard />
          <GameCard />
          

        </div>
      </div>
    
  )
}

export default GameMain