'use client'

import React from 'react'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter'
import ReduxProvider from '@/redux/reduxProvider'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from '@/components/dashboard/Dashboard';


const Providers = ({children}) => {
  
  return (
    <AppRouterCacheProvider>
        <ToastContainer position='bottom-right' />
        <ReduxProvider>
            <main className="w-screen h-screen">
              <Dashboard>
                {children}
              </Dashboard> 
            </main>
        </ReduxProvider>
    </AppRouterCacheProvider>
  )
}

export default Providers