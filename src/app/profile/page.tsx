'use client'
import { PostComp } from '@/components/Feed/Feed'
import UserCard from '@/components/Network/UserCard'
import { useCurrentUser } from '@/contexts/CurrentUserContext'
import { NewUser } from '@/libs/types'
import { Divider } from '@nextui-org/react'
import { User } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { currentUser, loadingCurrentUser } = useCurrentUser()
    const [followers, setFollowers] = React.useState<NewUser[]>([])
    const [following, setFollowing] = React.useState<NewUser[]>([])
    const [userPosts, setUserPosts] = React.useState<User[]>([])
    const [showing, setShowing] = useState("")

    useEffect(() => {
        if (currentUser)
            showPosts()
    }, [currentUser])
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
    const showPosts = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/mypost`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        if (res.ok) {
            setUserPosts(data || [])
        }
        setShowing("posts")
    }
    if (loadingCurrentUser) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='grid gap-4 items-center justify-center w-full p-4 h-full'>
            <div className='flex flex-col items-center justify-center gap-4 py-8'>
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
                    <button
                        className='text-sm text-blue-500'
                        onClick={
                            showPosts
                        }
                    >Posts {currentUser?._count?.posts || 0}</button>
                </div>
            </div>
            <Divider className='bg-slate-400 max-w-xl w-full mx-auto' />
            <div className='flex gap-4 flex-col w-full h-screen overflow-y-auto scrollbar-hide max-w-xl relative'>
                <p className='text-xl sticky top-0 w-full p-4 bg-[#00000071] backdrop-blur-sm rounded-lg'>
                    {
                        showing === "followers" ? "Followers"
                            : showing === "following" ? "Following"
                                : showing === "posts" ? "Posts"
                                    : null
                    }
                </p>
                {
                    showing === "followers" ?
                        followers.length === 0 ?
                            <p>Tell your friends to follow you!</p>
                            :
                            followers.map((follower) => (
                                <UserCard key={follower.id} user={follower} />
                            ))
                        :
                        showing === "following" ?
                            following.length === 0 ?
                                <p>You are not following anyone!</p>
                                :
                                following.map((follow) => (
                                    <UserCard key={follow.id} user={follow} />
                                ))
                            : null

                }

                {
                    showing === "posts" ?
                        userPosts.length === 0 ?
                            <p>You have not posted anything yet!</p>
                            :
                            userPosts.map((post: any) => (
                                <PostComp key={post.id} post={post} currentUser={currentUser} />
                            )) : null
                }

            </div>
        </div>
    )
}

export default Page