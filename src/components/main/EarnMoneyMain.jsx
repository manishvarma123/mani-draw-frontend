'use client'
import React from 'react'
import EarnMoneyCard from '../earn-money/EarnMoneyCard'
import Dashboard from '../dashboard/Dashboard'

const EarnMoneyMain = () => {
  return (
    
        <div className='w-full p-2 md:p-6 flex flex-col gap-8'>
            
            <EarnMoneyCard />
            <EarnMoneyCard />
            <EarnMoneyCard />
            <EarnMoneyCard />
            <EarnMoneyCard />
            <EarnMoneyCard />
            <EarnMoneyCard />
            
        </div>
    
  )
}

export default EarnMoneyMain