'use client'
import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'
import { MdAccountCircle } from "react-icons/md";
import { SiFeedly } from "react-icons/si";
import { CiSearch } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { RiNotification2Fill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import { Tooltip } from '@nextui-org/react';
const Sidebar = () => {
    const pathname = usePathname()
    const items = [
        {
            icon: <SiFeedly className={`w-6 h-6 ${pathname === '/' ? 'text-blue-500' : 'text-slate-600 hover:text-blue-400'}`} />,
            link: '/'
        },
        {
            icon: <GoPeople className={`w-6 h-6 ${pathname === '/network' ? 'text-blue-500' : 'text-slate-600 hover:text-blue-400'}`} />,
            link: '/network'
        },
        {
            icon: <MdAccountCircle className={`w-6 h-6 ${pathname === '/profile' ? 'text-blue-500' : 'text-slate-600 hover:text-blue-400'}`} />,
            link: '/profile'
        }
    ]
    return (
        <div className="
            flex flex-col items-center justify-between p-4 w-20 h-screen bg-[#121212] text-slate-100 overflow-y-auto overflow-x-hidden scrollbar-hide gap-8
        ">
            <Logo className='w-[48px] h-[48px] object-contain' />
            <div className='flex flex-col gap-6'>

                {
                    items.map((item, index) => (
                        <Tooltip
                            key={index}
                            content={item.link === '/' ? 'Feed' : item.link === '/network' ? 'Network' : item.link === '/explore' ? 'Explore' : item.link === '/notifications' ? 'Notifications' : 'Profile'}
                            classNames={{
                                content: 'bg-[#282828] text-white'
                            }}
                            placement='right'
                        >
                            <Link href={item.link}>
                                {item.icon}
                            </Link>
                        </Tooltip>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar