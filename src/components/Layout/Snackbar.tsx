"use client"
import { useSnackbar } from '@/contexts/SnackbarContext';
import React from 'react'
import { MdCheckCircle, MdError, MdWarning, MdInfo, MdClose } from 'react-icons/md'
const statusIcons = [
    <MdCheckCircle key={1} />,
    <MdError key={2} />,
    <MdWarning key={3} />,
    <MdInfo key={4} />
]

const Snackbar = () => {
    const { snackbar, showing, hideSnackbar } = useSnackbar();
    return (
        <div className={`${snackbar.status === 0 ? "bg-green-500" : snackbar.status === 1 ? "bg-red-500" : snackbar.status === 2 ? "bg-amber-600" : "bg-blue-500"}
         text-white p-4 rounded-lg fixed bottom-4 left-4 z-[999] items-center w-[90vw] max-w-[400px] justify-start gap-4 ${showing ? "flex" : "hidden"}`}>
            {statusIcons[snackbar.status]}
            <p>{snackbar.message}</p>
            {
                !snackbar.duration ? <MdClose className='cursor-pointer ml-auto' onClick={hideSnackbar} size={20} /> : null
            }
        </div>
    )
}

export default Snackbar