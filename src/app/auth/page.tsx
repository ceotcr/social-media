'use client'
import Logo from '@/components/Logo'
import SignInWithGitHub from '@/components/SignInWithGitHub'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PiPlugsConnectedLight } from "react-icons/pi";
import { Button } from '@nextui-org/react'

const Page = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [loading, setLoading] = React.useState(false)
    return (
        <>
            {session ? (
                <div
                    className='flex flex-col justify-center items-center p-4 max-w-[96%]'
                >
                    <div className="flex items-center justify-center gap-4 md:flex-row flex-col">
                        <Logo />
                        {
                            session.user?.image &&
                            session.user?.name
                            && (
                                <>
                                    <PiPlugsConnectedLight className='text-2xl md:rotate-0 transition-transform -rotate-[45deg] md:mb-0 mb-4' />
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
                    <br />
                    <h1 className='text-2xl'>Welcome {session.user?.name}</h1>
                    <p className=''>You are signed in with {session.user?.email}</p>
                    <div className="flex gap-4 items-center justify-center">
                        <Button className='bg-blue-500 text-white px-4 py-2 mt-4 rounded-md transition-colors'
                            onPress={() => {
                                router.push('/')
                            }}
                        >
                            Home
                        </Button>
                        <Button className='
                    text-white px-4 py-2 mt-4 rounded-md outline outline-slate-400 outline-1  transition-colors bg-transparent
                    '
                            isLoading={loading}
                            onPress={
                                () => {
                                    setLoading(true)
                                    signOut().then(
                                        () => {
                                            alert(
                                                "You have signed out"
                                            )
                                            setLoading(false)
                                        }
                                    )
                                }
                            }
                        >Sign out</Button>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center p-4 max-w-[96%]'>
                    <Logo />
                    <SignInWithGitHub />
                </div>
            )}
        </>
    )
}

export default Page