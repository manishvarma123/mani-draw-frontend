"use client"

import { setShowPage } from '@/redux/slices/route'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from "react-icons/rx";
import { emailRegex, ERROR_MESSAGE, phoneRegex } from '@/lib/constants'
import { toast } from 'react-toastify'
import { setCurrentUser } from '@/redux/slices/authSlice'
import SummaryApi from '@/common'
import { getCurrentUser } from '@/services/auth'

const RegisterPage = () => {

    const dispatch = useDispatch()
    const router = useRouter()

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
            }
        };

        fetchCurrentUser();


        if (currentUser) {
            router.push(`/`);
        }

    }, [dispatch, currentUser]);

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [fullname, setFullName] = useState("")
    const [fullnameErr, setFullNameErr] = useState("")

    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState("")

    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState("")

    const [phone, setPhone] = useState("")
    const [phoneErr, setPhoneErr] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        setFullNameErr("");
        setEmailErr("");
        setPasswordErr("");
        setPhoneErr("");

        let hasErrors = false;

        if (!fullname) {
            setFullNameErr("Full name is Required");
            hasErrors = true;
        }

        if (!email) {
            setEmailErr("Email is Required");
            hasErrors = true;
        } else if (!emailRegex.test(email)) {
            setEmailErr("Invalid Email Format");
            hasErrors = true;
        }

        if (!password) {
            setPasswordErr("Password is Required");
            hasErrors = true;
        } else if (password.length < 6) {
            setPasswordErr("Password must have at least 6 characters");
            hasErrors = true;
        }

        if (!phone) {
            setPhoneErr("Phone is Required");
            hasErrors = true;
        } else if (!phoneRegex.test(phone)) {
            setPhoneErr("Invalid phone number");
            hasErrors = true;
        }

        if (hasErrors) {
            setLoading(false);
            return;
        }

        try {
            const data = {
                name: fullname,
                email: email,
                password: password,
                phone: phone
            }
            const response = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const json = await response.json();

            if (json.success) {
                const token = json.token;

                if (!token) {
                    throw new Error("Something went Wrong")
                }

                localStorage.setItem("token", token);

                dispatch(setCurrentUser(json.data));

                toast.success(json?.message)

                router.push('/');
            }

            if (json.error) {
                toast.error(json.message || ERROR_MESSAGE)
            }
        } catch (error) {
            toast.error(error.message || ERROR_MESSAGE);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-orange-600 flex justify-center items-center px-5 py-5'>
            <div className='w-full max-w-[400px] bg-white backdrop-blur-2xl rounded-lg shadow-lg border-[2px] border-gray-200 px-6 py-5'>
                <div className='w-full flex justify-end' onClick={() => {
                    dispatch(setShowPage('/'))
                    router.push('/')
                }}><RxCross2 className='text-2xl' /></div>
                <h2 className='text-center text-2xl font-bold text-gray-800 mb-4'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1 mb-4'>
                        {/* <label htmlFor='Email' className='text-sm'>Name</label> */}
                        <input id='Email' placeholder='Name' className='block w-full border-[1px] px-2 py-1 rounded-md' value={fullname} onChange={(e) => {
                            setFullName(e.target.value)
                        }} />
                        <span className="text-red-400 text-xs -mt-1">{fullnameErr}</span>
                    </div>

                    <div className='flex flex-col gap-1 mb-4'>
                        {/* <label htmlFor='Email' className='text-sm'>Email</label> */}
                        <input id='Email' placeholder='Email' className='block w-full border-[1px] px-2 py-1 rounded-md' value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                        <span className="text-red-400 text-xs -mt-1">{emailErr}</span>
                    </div>

                    <div className='flex flex-col gap-1 mb-4'>
                        {/* <label htmlFor='Email' className='text-sm'>Password</label> */}
                        <input id='Email' placeholder='Password' className='block w-full border-[1px] px-2 py-1 rounded-md' value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                        <span className="text-red-400 text-xs -mt-1">{passwordErr}</span>
                    </div>

                    <div className='flex flex-col gap-1 mb-4'>
                        {/* <label htmlFor='Phone' className='text-sm'>Phone</label> */}
                        <input id='Phone' placeholder='Phone' className='block w-full border-[1px] px-2 py-1 rounded-md' value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }} />
                        <span className="text-red-400 text-xs -mt-1">{phoneErr}</span>
                    </div>

                    <button type='submit' className='block bg-blue-600 w-full px-4 py-2 text-white rounded-md mt-8' >Submit</button>
                </form>

                <div className='mt-4 text-center'>
                    <p className='text-gray-600'>Already have an account?</p>
                    <button
                        onClick={() => {
                            dispatch(setShowPage("login"))
                            router.push('/login')
                        }}  // Adjust this path to match your register route
                        className='text-blue-600 hover:text-blue-700 transition duration-200 underline font-semibold'>
                        Login here
                    </button>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage