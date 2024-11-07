'use client'
import React from 'react'
import Dashboard from '../dashboard/Dashboard'
import { useSelector } from 'react-redux'
import LuckyDrawCard from '../lucky-draw/LuckyDrawCard'

const HomeMain = () => {
  const {user} = useSelector((state)=>state.route)
  return (
    <>
      <span>Manish</span>
    </>
    
  )
}

export default HomeMain