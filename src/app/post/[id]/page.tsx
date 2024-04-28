import { PostComp } from '@/components/Feed/Feed'
import PostCompClient from '@/components/Feed/PostCompClient'
import React from 'react'

const getPost = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, { cache: 'no-store' })
    const data = await res.json()
    return data
}

const Page = async ({
    params
}: {
    params: {
        id: string
    }
}) => {
    const post = await getPost(params.id);
    const content = !post.id ? (
        <div>
            <h1>Post not found</h1>
        </div>
    ) : (
        <div className='w-full p-8 h-fit'>
            <PostCompClient post={post} isPage />
        </div>
    );
    return content;
}

export default Page