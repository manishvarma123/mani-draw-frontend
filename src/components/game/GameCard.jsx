import Image from 'next/image'
import React from 'react'
import { TbCoinRupeeFilled } from 'react-icons/tb'

const GameCard = () => {
    return (
        <div className='w-full max-w-[600px] m-auto rounded-md bg-white shadow-lg border-[2px]  px-2 py-2'>

            <div className='flex gap-4 md:gap-6'>
                <div className='flex gap-2 grow'>
                    <div>
                        <div className='w-10 md:w-10 h-10 md:h-10 rounded-lg bg-red-600'>
                            <Image src='' alt=''/>
                        </div>
                    </div>
                    <div className='grow flex flex-col gap-1'>
                        <span className='text-sm font-bold'>Ludo</span>
                        <span className='text-xs text-gray-400'>Play to win 100 coins </span>
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <div className='w-[90px] md:w-[100px] border-[2px] bg-green-600 text-white rounded-md text-[12px] flex justify-center items-center px-4 py-1 font-bold'>
                        <span className='flex items-center gap-1'>
                            <TbCoinRupeeFilled className='text-yellow-400 text-lg' />
                            <span className='text-white text-base'> 50</span>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default GameCard