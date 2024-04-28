'use client'

import React from 'react'
import { PostComp } from './Feed'
import { Like } from '@prisma/client'
import { useCurrentUser } from '@/contexts/CurrentUserContext'

const PostCompClient = ({ post, isPage }: {
    isPage?: boolean
    post: {
        id: string
        title: string
        content: string
        likes: Like[],
        author: {
            name: string
            email: string
            image: string
        }
    }
}) => {
    const { currentUser, loadingCurrentUser } = useCurrentUser()
    return (
        <PostComp post={post} currentUser={currentUser} isPage={
            isPage
        } />
    )
}

export default PostCompClient