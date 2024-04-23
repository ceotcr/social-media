'use client'
import React from 'react'
import {
    Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Button, Input, Textarea, useDisclosure,
    Tooltip
} from '@nextui-org/react'
import { HiPlus } from 'react-icons/hi';
const CreatePost = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                                />
                                <textarea placeholder='Content'
                                    className='w-full bg-[#1c1c1c] text-white rounded-lg p-2 mb-2 focus:outline-none'
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
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