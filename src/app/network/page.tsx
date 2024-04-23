'use client'
import UserCard from '@/components/Network/UserCard'
import { useCurrentUser } from '@/contexts/CurrentUserContext'
import { NewUser } from '@/libs/types'
import React, { Suspense } from 'react'

const Page = () => {
    const [people, setPeople] = React.useState<NewUser[]>([])
    const { currentUser } = useCurrentUser()
    React.useEffect(() => {
        const fetchPeople = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/network`, {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

            setPeople(data)
        }
        fetchPeople();
    }, [currentUser])

    const FallBack = () => {
        return (
            <div className='animate-pulse flex flex-col items-center justify-center rounded-lg w-full bg-[#282828] p-4 gap-4'>
                <div className='flex gap-2 w-full rounded-lg items-center'>
                    <div className='min-w-[48px] max-w-[48px] h-[48px] rounded-full bg-slate-400'></div>
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='w-24 h-4 bg-slate-400 rounded-lg'></div>
                        <div className='w-full h-4 bg-slate-400 rounded-lg'></div>
                    </div>
                </div>
                <div className="flex gap-4 w-full">
                    <div className='w-12 h-4 bg-slate-400 rounded-lg'></div>
                    <div className='w-12 h-4 bg-slate-400 rounded-lg'></div>
                    <div className='w-12 h-4 bg-slate-400 rounded-lg ml-auto'></div>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full h-full flex flex-col p-4'>
            <h1 className='text-xl font-extralight'>People You May Know...</h1>
            <br />
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
                {
                    people.length < 1 ?
                        <>
                            <FallBack />
                            <FallBack />
                            <FallBack />
                        </> :
                        <Suspense fallback={<FallBack />}>
                            {
                                people.map((person, index) => (
                                    <UserCard key={index} user={person} />
                                ))
                            }
                        </Suspense>
                }
            </div>
        </div>
    )
}

export default Page