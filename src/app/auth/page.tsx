'use client'
import Logo from '@/components/Logo'
import SignInWithGitHub from '@/components/SignInWithGitHub'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PiPlugsConnectedLight } from "react-icons/pi";

const Page = () => {
    const router = useRouter()
    const { data: session } = useSession()
    return (
        <div className=' flex flex-col justify-center items-center h-screen w-full bg-black text-white
        '>
            {session ? (
                <div
                    className='flex flex-col justify-center items-center'
                >
                    <div className="flex items-center justify-center gap-4">
                        <Logo />
                        {
                            session.user?.image &&
                            session.user?.name
                            && (
                                <>
                                    <PiPlugsConnectedLight className='text-2xl' />
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name}
                                        width={100}
                                        height={100}
                                        className='rounded-full w-24 h-24'
                                    />
                                </>
                            )
                        }
                    </div>
                    <h1 className='text-2xl'>Welcome {session.user?.name}</h1>
                    <p className=''>You are signed in with {session.user?.email}</p>
                    <div className="flex gap-4 items-center justify-center">
                        <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md transition-colors'
                            onClick={() => {
                                router.push('/')
                            }}
                        >
                            Home
                        </button>
                        <button className='
                    text-white px-4 py-2 mt-4 rounded-md outline outline-slate-400 hover:outline-slate-200 outline-1  transition-colors
                    ' onClick={() => signOut()}>Sign out</button>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center'>
                    <Logo />
                    <SignInWithGitHub />
                </div>
            )}
        </div>
    )
}

export default Page