'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Follow, User } from '@prisma/client'
import { NewUser } from '@/libs/types'
import { Button } from '@nextui-org/react'
import FollowButton from './FollowButton'
import { useCurrentUser } from '@/contexts/CurrentUserContext'

const UserCard = ({
    user
}: {
    user: NewUser
}) => {
    const [isFollowing, setIsFollowing] = React.useState(false);
    const [isItMe, setIsItMe] = React.useState(
        false
    );

    const [
        thisUser, setThisUser
    ] = React.useState<{
        id: string
        name: string
        email: string
        followers: number
        following: number
        image: string
    }>(
        {
            id: '',
            name: '',
            email: '',
            followers: 0,
            following: 0,
            image: ''
        }
    );

    useEffect(() => {
        setThisUser({
            id: user.id,
            name: user.name as string,
            email: user.email,
            followers: user.followers.length,
            following: user.following.length,
            image: user.image as string
        });
    }
        , [user]);

    const { currentUser, loadingCurrentUser } = useCurrentUser();

    useEffect(() => {
        if (!currentUser || !currentUser.following) return;
        const isUserFollowing = currentUser.following.some((follow: Follow) => follow.followingId === user.id);
        setIsFollowing(isUserFollowing);
    }, [currentUser, user]);

    useEffect(() => {
        if (!currentUser) return;
        setIsItMe(currentUser.id === user.id);
    }, [currentUser, user]);

    return (
        <div className="flex flex-col items-center justify-center rounded-lg w-full bg-[#282828] p-4 gap-4 h-fit max-w-[512px]">
            <div className='flex gap-2 w-full rounded-lg items-center'>
                {
                    thisUser.image ? (
                        <Image
                            src={thisUser.image}
                            width={50}
                            height={50}
                            className='rounded-full w-12 h-12'
                            alt={thisUser.name as string}
                        />
                    ) : (
                        <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
                    )
                }
                <div className='flex flex-col w-full p-2 gap-1' style={{ minWidth: '200px' }}>
                    <p className='text-lg text-gray-200'>{thisUser.name}</p>
                    <p className='text-small text-gray-500'>{thisUser.email}</p>
                </div>
            </div>
            <div className="flex justify-start items-center w-full gap-4">
                <div className='flex items-center justify-center gap-1'>

                    <p className='text-sm text-blue-400 font-extralight'>{thisUser.followers}</p>
                    <p className='text-sm text-blue-400 font-extralight'>Followers</p>
                </div>
                <div className='flex items-center justify-center gap-1'>

                    <p className='text-sm text-blue-400 font-extralight'>{thisUser.following}</p>
                    <p className='text-sm text-blue-400 font-extralight'>Following</p>

                </div>
                {
                    loadingCurrentUser ?
                        <p className='text-sm text-blue-400 font-extralight ml-auto'>...</p> :
                        isItMe ? <p className='text-sm text-blue-400 font-extralight ml-auto'
                        >You</p> :
                            <FollowButton user={thisUser} isFollowing={isFollowing} setIsFollowing={setIsFollowing} setThisUser={setThisUser} />
                }
            </div>
        </div>
    )
}

export default UserCard