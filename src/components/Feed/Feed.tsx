import React, { useEffect } from 'react'
import { ClientDivider } from '../nextUiClient'
import { Like } from '@prisma/client'
import Image from 'next/image'
import { MdDelete, MdEdit, MdFavorite, MdOutlineFavorite } from 'react-icons/md'
import { useCurrentUser } from '@/contexts/CurrentUserContext'
import { NewUser } from '@/libs/types'
import { IoOpenOutline } from 'react-icons/io5'
import Link from 'next/link'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Pagination } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { useSnackbar } from '@/contexts/SnackbarContext'

const Feed = ({ posts, count, page, setPage, loading }: {
    setPage: React.Dispatch<React.SetStateAction<number>>
    loading: boolean
    page: number
    count: number
    posts: {
        id: string
        title: string
        content: string
        likes: Like[]
        author: {
            name: string
            email: string
            image: string
        }
    }[]
}) => {
    const { currentUser, loadingCurrentUser } = useCurrentUser()
    return (
        <div
            className="flex flex-col w-full h-screen p-4 gap-4"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-white">Feed</h1>
                <Pagination total={Math.ceil(count / 2)} variant='flat' initialPage={page} page={page} onChange={setPage} />
            </div>
            <div className="grid md:grid-cols-2 h-full overflow-y-auto overflow-x-hidden gap-4 scrollbar-hide">
                {
                    loading || !currentUser ?
                        <>
                            <PostFallback /><PostFallback /><PostFallback /><PostFallback /><PostFallback /><PostFallback />
                        </>
                        :
                        posts.map((post) => (
                            <PostComp key={post.id} post={post} currentUser={currentUser} />
                        ))
                }

            </div>
        </div>
    )
}

export default Feed

export const PostComp = ({ post, currentUser, isPage }: {
    post: {
        id: string
        title: string
        content: string
        likes: Like[]
        author: {
            name: string
            email: string
            image: string
        }
    }
    isPage?: boolean
    currentUser: NewUser
}) => {
    const [isLiked, setIsLiked] = React.useState(true)
    useEffect(() => {
        setIsLiked(
            post.likes.some((like) => like.userId === currentUser.id)
        )
    }, [currentUser.id, post.likes])
    const { showSnackbar } = useSnackbar()
    const [isMyPost, setIsMyPost] = React.useState(false)
    useEffect(() => {
        setIsMyPost(currentUser.email === post.author.email)
    }, [currentUser.email, post.author.email])
    const router = useRouter()
    const [likes, setLikes] = React.useState(post.likes.length)
    return (<>
        <div key={post.id} className={` bg-[#38383869] w-full flex flex-col rounded-lg ${isPage ? "max-w-2xl max-h-[70vh] mx-auto" : "max-h-[300px]"}`}>
            <div className="user-details flex items-center p-4 gap-4">
                <div className="h-12 w-12 bg-white rounded-full overflow-hidden">
                    <Image src={post.author?.image as string} alt={post.author?.name} width={100} height={100}
                        className='object-center object-cover'
                    />
                </div>
                <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                        <h2 className="text-slate-100 text-lg font-semibold">{post.author?.name}</h2>
                        <p className="text-slate-300 font-light">{post.author?.email}</p>
                    </div>{
                        !isPage &&

                        <Link href={`/post/${post.id}`}>
                            <IoOpenOutline size={24} className='text-white' />
                        </Link>
                    }
                    {
                        isPage && isMyPost &&
                        <div className='flex items-center justify-center ml-auto gap-4'>
                            <Link href={`/edit/${post.id}`}><MdEdit className=' hover:text-blue-300' size={24} /></Link>
                            <MdDelete className='cursor-pointer hover:text-blue-300' size={24} onClick={
                                async () => {
                                    const confirmation = confirm(
                                        'Are you sure you want to delete this post?'
                                    )
                                    if (!confirmation) return
                                    const res = await fetch('/api/posts/mypost', {
                                        method: 'DELETE',
                                        body: JSON.stringify({
                                            id: post.id
                                        })
                                    })
                                    if (res.ok) {
                                        showSnackbar(3000, 0, 'Post deleted successfully')
                                        router.push('/')
                                    }
                                    else {
                                        showSnackbar(3000, 1, 'An error occurred while deleting the post')
                                    }
                                }
                            } />
                        </div>
                    }
                </div>
            </div>
            <ClientDivider className='bg-slate-600' />
            <div className="flex flex-col p-4 gap-2 overflow-y-auto scrollbar-hide">
                <h1 className={`text-white text-2xl font-bold break-words ${isPage ? "" : "line-clamp-1"}`}>{post.title}</h1>
                <p className={`text-white break-words ${isPage ? "" : "line-clamp-3"}`}>{post.content}</p>
            </div>
            <ClientDivider className='mt-auto bg-slate-600' />
            <div className="flex gap-2 items-center p-4">
                {
                    isLiked ?
                        <MdFavorite color='pink' className=' cursor-pointer' size={24} onClick={
                            async () => {
                                setIsLiked(false)
                                setLikes(
                                    (prev) => prev - 1
                                )
                                const res = await fetch('/api/posts/like', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        postId: post.id
                                    })
                                })
                                if (!res.ok) {
                                    setIsLiked(true)
                                    setLikes(
                                        (prev) => prev + 1
                                    )
                                }
                            }
                        } />
                        :
                        <MdFavorite className=' cursor-pointer' size={24} onClick={
                            async () => {
                                setIsLiked(true)
                                setLikes(
                                    (prev) => prev + 1
                                )
                                const res = await fetch('/api/posts/like', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        postId: post.id
                                    })
                                })
                                if (!res.ok) {
                                    setIsLiked(false)
                                    setLikes(
                                        (prev) => prev - 1
                                    )
                                }
                            }
                        } />
                }
                <p className="text-white">{likes}</p>
            </div>
        </div>
    </>
    )
}

export const PostFallback = () => {
    return (
        <div className="animate-pulse bg-[#38383869] flex flex-col rounded-lg h-fit min-h-[300px]">
            <div className="user-details flex items-center p-4 gap-4">
                <div className="h-12 w-12 bg-white rounded-full overflow-hidden animate-pulse">
                    <div className='w-full h-full bg-gray-300' />
                </div>
                <div className="flex flex-col">
                    <div className="w-24 h-4 bg-gray-300 animate-pulse" />
                    <div className="w-20 h-3 bg-gray-300 animate-pulse" />
                </div>
            </div>
            <ClientDivider className='bg-slate-600' />
            <div className="flex flex-col p-4 gap-2">
                <div className="w-40 h-6 bg-gray-300 animate-pulse" />
                <div className="w-52 h-4 bg-gray-300 animate-pulse" />
            </div>
        </div>
    )
}