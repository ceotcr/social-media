import React from 'react'
import { ClientDivider } from '../nextUiClient'
import FollowButton from '../Network/FollowButton'
import { Post } from '@prisma/client'
import Image from 'next/image'

const Feed = ({ posts }: {
    posts: {
        id: string
        title: string
        content: string
        author: {
            name: string
            email: string
            image: string
        }
    }[]
}) => {
    return (
        <div
            className="flex flex-col w-full h-screen p-4 gap-4"
        >
            <h1 className="text-4xl font-bold text-white">Feed</h1>
            <br />
            <div className="grid md:grid-cols-2 h-full overflow-y-auto overflow-x-hidden gap-4">
                {
                    posts.map((post) => (
                        <div key={post.id} className=" bg-[#38383869] flex flex-col rounded-lg h-fit min-h-[300px]">
                            <div className="user-details flex items-center p-4 gap-4">
                                <div className="h-12 w-12 bg-white rounded-full overflow-hidden">
                                    <Image src={post.author?.image as string} alt={post.author?.name} width={100} height={100}
                                        className='object-center object-cover'
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-slate-100 text-lg font-semibold">{post.author?.name}</h2>
                                    <p className="text-slate-300 font-light">{post.author?.email}</p>
                                </div>
                            </div>
                            <ClientDivider className='bg-slate-600' />
                            <div className="flex flex-col p-4 gap-2">
                                <h1 className="text-white text-2xl font-bold">{post.title}</h1>
                                <p className="text-white">{post.content}</p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Feed