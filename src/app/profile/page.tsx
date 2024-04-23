'use client'
import UserCard from '@/components/Network/UserCard'
import { useCurrentUser } from '@/contexts/CurrentUserContext'
import { NewUser } from '@/libs/types'
import { User } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'

const Page = () => {
    const { currentUser, loadingCurrentUser } = useCurrentUser()
    const [followers, setFollowers] = React.useState<NewUser[]>([])
    const [following, setFollowing] = React.useState<NewUser[]>([])
    const [showing, setShowing] = useState("")
    const showFollowers = async () => {
        if (!currentUser?.followers || currentUser?.followers.length === 0) {
            setFollowers([])
            setShowing("followers")
            return
        }
        const ids = currentUser?.followers.map((follower) => {
            return (
                follower.followerId
            )
        })
        if (JSON.stringify(ids) === JSON.stringify(followers.map((follower) => follower.id))) {
            setShowing("followers")
            return
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/network/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: ids })
        })
        const data = await res.json()
        setShowing("followers")
        setFollowers(data.users || [])
    }
    const showFollowing = async () => {
        if (!currentUser?.following || currentUser?.following.length === 0) {
            setFollowing([])
            setShowing("following")
            return
        }
        const ids = currentUser?.following.map((follow) => {
            return (
                follow.followingId
            )
        })
        if (JSON.stringify(ids) === JSON.stringify(following.map((follow) => follow.id))) {
            setShowing("following")
            return
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/network/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: ids })
        })
        const data = await res.json()
        setShowing("following")
        setFollowing(data.users || [])
    }
    if (loadingCurrentUser) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='grid gap-4 md:grid-cols-2 w-full p-4'>
            <div className='flex flex-col gap-4'>
                <Image
                    src={currentUser?.image as string}
                    alt={currentUser?.name as string}
                    width={128}
                    height={128}
                    className='rounded-full'
                />
                <h1 className='text-2xl'>{currentUser?.name}</h1>
                <p className='text-sm'>{currentUser?.email}</p>
                <div className="flex gap-4">
                    <button className='text-sm text-blue-500'
                        onClick={showFollowers}
                    >Followers {currentUser?.followers?.length || 0}</button>
                    <button className='text-sm text-blue-500'
                        onClick={showFollowing}
                    >Following {currentUser?.following?.length || 0}</button>
                </div>
            </div>
            <div className='flex gap-4 flex-col'>
                <p className='text-xl'>{showing === "followers" ? "Followers" :
                    showing === "following" && "Following"}</p>
                {
                    showing === "followers" ?
                        followers.length === 0 ?
                            <p>Tell your friends to follow you!</p>
                            :
                            followers.map((follower) => (
                                <UserCard key={follower.id} user={follower} />
                            ))
                        :
                        showing === "following" &&
                            following.length === 0 ?
                            <p>You are not following anyone!</p>
                            :
                            following.map((follow) => (
                                <UserCard key={follow.id} user={follow} />
                            ))
                }
            </div>
        </div>
    )
}

export default Page