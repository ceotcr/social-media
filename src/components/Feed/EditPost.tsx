'use client'
import { publishPost } from '@/libs/feed/Posts'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '@/contexts/SnackbarContext'

const EditPost = ({ id, post }: { id: string, post: any }) => {
    const router = useRouter()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { showSnackbar } = useSnackbar()
    const [data, setData] = React.useState({
        title: post.title,
        content: post.content,
    })
    const editedPublish = async (title: string, content: string, published: boolean) => {
        const res = await fetch('/api/posts/mypost', {
            method: 'PUT',
            body: JSON.stringify({
                id,
                title,
                content,
                published
            })
        })
        const json = await res.json()
        if (res.ok) return true
        return false
    }
    useEffect(() => {
        onOpen();
    }
        , [onOpen])
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton
                classNames={
                    {
                        base: 'bg-[#282828] text-white z-50',
                    }
                }
            >

                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Create Post</ModalHeader>
                            <ModalBody>
                                <input placeholder='Title'
                                    className='w-full bg-[#1c1c1c] text-white rounded-lg p-2 mb-2 focus:outline-none'
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                />
                                <textarea placeholder='Content'
                                    value={data.content}
                                    onChange={(e) => setData({ ...data, content: e.target.value })}
                                    className='w-full bg-[#1c1c1c] text-white rounded-lg p-2 mb-2 focus:outline-none'
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => {
                                    setData({
                                        title: '',
                                        content: ''
                                    })
                                    onClose()
                                }}>
                                    Discard
                                </Button>
                                <Button color="primary" onPress={async () => {
                                    const res = await publishPost(
                                        data.title,
                                        data.content,
                                        false
                                    )
                                    if (res) {
                                        if (!data.title || !data.content) {
                                            showSnackbar(3000, 2, 'Please fill in all fields.')
                                            return
                                        }
                                        setData({
                                            title: '',
                                            content: ''
                                        })
                                        onClose()
                                        showSnackbar(3000, 3, 'Post saved.')
                                        router.push(`/post/${id}`)
                                    }
                                }}>
                                    Save
                                </Button>
                                <Button color="success" onPress={
                                    async () => {
                                        if (!data.title || !data.content) {
                                            showSnackbar(3000, 2, 'Please fill in all fields.')
                                            return
                                        }
                                        const res = await editedPublish(
                                            data.title,
                                            data.content,
                                            true
                                        )
                                        if (res) {
                                            setData({
                                                title: '',
                                                content: ''
                                            })
                                            onClose()
                                            showSnackbar(3000, 0, 'Post Updated.')
                                            router.push(`/post/${id}`)
                                        }
                                    }
                                }>
                                    Post
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    )
}

export default EditPost