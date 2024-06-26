'use client'
import React from 'react'
import {
    Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Button, Input, Textarea, useDisclosure,
    Tooltip
} from '@nextui-org/react'
import { HiPlus } from 'react-icons/hi';
import { publishPost } from '@/libs/feed/Posts';
import { useSnackbar } from '@/contexts/SnackbarContext';
const CreatePost = ({ setFeedPosts, feedPosts }: {
    setFeedPosts: React.Dispatch<React.SetStateAction<{
        id: string;
        title: string;
        content: string;
        likes: import("@prisma/client").Like[];
        author: {
            name: string;
            email: string;
            image: string;
        };
    }[]>>
    feedPosts: {
        id: string;
        title: string;
        content: string;
        likes: import("@prisma/client").Like[];
        author: {
            name: string;
            email: string;
            image: string;
        };
    }[]
}) => {
    const { showSnackbar } = useSnackbar()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [data, setData] = React.useState({
        title: '',
        content: '',
    })
    return (
        <>
            <Tooltip
                content='Create Post'
                placement='left'
                classNames={{
                    content: 'bg-[#282828] text-white'
                }}
            >
                <button
                    onClick={onOpen}
                    className='flex items-center gap-2 bg-[#282828] text-white p-2 rounded-lg fixed bottom-4 right-4 z-50'
                >
                    <HiPlus size={32} />
                </button>
            </Tooltip>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton
                classNames={
                    {
                        base: 'bg-[#282828] text-white',
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

                                    if (!data.title || !data.content) {
                                        showSnackbar(3000, 2, 'Please fill in all fields.')
                                        return
                                    }
                                    const res = await publishPost(
                                        data.title,
                                        data.content,
                                        false
                                    )
                                    if (res) {
                                        setData({
                                            title: '',
                                            content: ''
                                        })
                                        setFeedPosts([res, ...feedPosts])
                                        onClose()
                                        showSnackbar(3000, 0, 'Post saved.')
                                    } else {
                                        showSnackbar(3000, 1, 'Error saving post.')
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
                                        const res = await publishPost(
                                            data.title,
                                            data.content,
                                            true
                                        )
                                        if (res) {
                                            setData({
                                                title: '',
                                                content: ''
                                            })
                                            setFeedPosts([res, ...feedPosts])
                                            onClose()
                                            showSnackbar(3000, 0, 'Post published.')
                                        }
                                        else {
                                            showSnackbar(3000, 1, 'Error publishing post.')
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

export default CreatePost