'use client'
import React from 'react'
import { useSelector } from 'react-redux'

const HomeMain = () => {
  const {showPage} = useSelector((state)=>state.route)

  return (
    <>
      {showPage === 'home' ? <span>Manish</span> : null}
    
    </>
    
  )
}

export default HomeMain