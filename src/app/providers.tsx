'use client'
import { CurrentUserProvider } from '@/contexts/CurrentUserContext'
import { SnackbarProvider } from '@/contexts/SnackbarContext'
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
                <SnackbarProvider>
                    {children}
                </SnackbarProvider>
            </NextUIProvider>
        </CurrentUserProvider>
    )
}

export default ClientProviders