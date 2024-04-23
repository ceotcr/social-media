'use client'
import { CurrentUserProvider } from '@/contexts/CurrentUserContext'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'

const ClientProviders = (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    return (
        <CurrentUserProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </CurrentUserProvider>
    )
}

export default ClientProviders