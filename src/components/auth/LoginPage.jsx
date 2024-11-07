"use client"

import { setShowPage } from '@/redux/slices/route'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RxCross2 } from "react-icons/rx";
import { backendDomain, ERROR_MESSAGE } from '@/lib/constants'
import SummaryApi from '@/common'
import { setCurrentUser, setWalletBalance } from '@/redux/slices/authSlice'
import { toast } from 'react-toastify'
import LogoutPopUp from '../popup/LogoutPopUp'

const LoginPage = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState("")

    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        setEmailErr("")
        setPasswordErr("")
        setLoading(true)
        
        let hasErrors = false;

        if(!email){
            setEmailErr("Please Enter email")
            hasErrors(true)
        }

        if(!password){
            setPasswordErr("Please Enter password")
            hasErrors(true)
        }

        if(hasErrors){
            setLoading(false)
            return;
        }

        try{
            const data = {
                email : email,
                password : password
            }

            const response = await fetch(SummaryApi.signIn.url,{
                method : SummaryApi.signIn.method,
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(data)
            })

            const json = await response.json()

            if(json.error){
                toast.error(json?.message)
            }
            if(json?.success){
                const token = json.token;
                if(!token){
                    throw new Error(ERROR_MESSAGE)
                }
                localStorage.setItem('token',token);
                dispatch(setCurrentUser(json?.data));
                dispatch(setWalletBalance(json?.data?.walletBalance))
                toast.success(json?.message)
                router.push('/')
            }

        }catch(err){
            toast.error(err.message || ERROR_MESSAGE)
        } finally{
            setLoading(false);
        }



    }

    return (
        <>
            <div className='fixed top-0 right-0 bottom-0 left-0 bg-orange-600 flex justify-center items-center p-5'>
                <div className='w-full max-w-[400px] bg-white/45 rounded-lg shadow-lg border-[2px] border-gray-200 p-6'>
                    <div className='w-full flex justify-end' onClick={()=>{
                        dispatch(setShowPage('/'))
                        router.push('/')
                    }}><RxCross2 className='text-2xl'/></div>
                    <h2 className='text-center text-2xl font-bold text-gray-800 mb-4'>Login</h2>

                    <form onSubmit={handleSubmit}>

                        <div className='flex flex-col gap-1 mb-4'>
                            <input
                                id='Email'
                                placeholder='Email'
                                className='block w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="text-red-400 text-xs -mt-1">{emailErr}</span>
                        </div>

                        <div className='flex flex-col gap-1 mb-4'>
                            <input
                                id='Password'
                                type='password'
                                placeholder='Password'
                                className='block w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="text-red-400 text-xs -mt-1">{passwordErr}</span>
                        </div>

                        <button
                            type='submit'
                            className='block bg-blue-600 hover:bg-blue-700 transition duration-200 w-full px-4 py-2 text-white font-semibold rounded-md mt-6'>
                            Submit
                        </button>
                    </form>

                    <div className='mt-4 text-center'>
                        <p className='text-gray-600'>Don’t have an account?</p>
                        <button
                            onClick={() => {
                                dispatch(setShowPage("register"))
                                router.push('/register')
                            }}  // Adjust this path to match your register route
                            className='text-blue-600 hover:text-blue-700 transition duration-200 underline font-semibold'>
                            Register here
                        </button>
                    </div>
                </div>
            </div>

        </>


    )
}

export default LoginPage