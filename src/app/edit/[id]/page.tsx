import EditPost from '@/components/Feed/EditPost'
import React from 'react'
const fetchPost = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, { cache: 'no-store' })
    const json = await res.json()
    return json
}
const Page = async ({ params }: { params: { id: string } }) => {
    const post = await fetchPost(params.id)
    return (
        <>
            <EditPost post={post} id={post.id} />
        </>
    )
}

export default Page