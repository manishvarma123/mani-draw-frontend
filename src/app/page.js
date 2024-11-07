'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const HomeMain = () => {
  const {showPage} = useSelector((state)=>state.route)
  const router = useRouter();

  useEffect(()=>{
    if(showPage === "lucky-draw"){
      router.push('/lucky-draw');
    }
  },[])

  return (
    <>
      {showPage === 'home' ? <span>Manish</span> : null}
    
    </>
    
  )
}

export default HomeMain