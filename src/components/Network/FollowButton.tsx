'use client'
import { useCurrentUser } from '@/contexts/CurrentUserContext'
import { NewUser } from '@/libs/types'
import { Button } from '@nextui-org/react'
import React from 'react'

const FollowButton = (
    {
        user,
        isFollowing,
        setIsFollowing,
        setThisUser
    }: {
        user: {
            id: string
            name: string
            email: string
            followers: number
            following: number
            image: string
        }
        isFollowing: boolean
        setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>
        setThisUser: React.Dispatch<React.SetStateAction<{
            id: string
            name: string
            email: string
            followers: number
            following: number
            image: string
        }>
        >
    }
) => {
    const { followUser, unfollowUser } = useCurrentUser()
    return (
        <Button
            radius='full'
            className={`text-white px-2 py-1 ml-auto text-sm h-fit ${isFollowing ? "bg-transparent border-1 border-slate-300 text-slate-300" : "bg-blue-500"}`}
            onPress={
                async () => {
                    if (isFollowing) {
                        setIsFollowing(false)
                        setThisUser({
                            ...user,
                            followers: user.followers - 1
                        })
                        const res: boolean = await unfollowUser(user.id)
                        if (!res) {
                            setIsFollowing(true)
                            setThisUser({
                                ...user,
                                followers: user.followers + 1
                            })
                        }
                    }
                    else {
                        setIsFollowing(true)
                        setThisUser({
                            ...user,
                            followers: user.followers + 1
                        })
                        const res: boolean = await followUser(user.id)
                        if (!res) {
                            setIsFollowing(false)
                            setThisUser({
                                ...user,
                                followers: user.followers - 1
                            })
                        }
                    }
                }
            }
        >
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    )
}

export default FollowButton