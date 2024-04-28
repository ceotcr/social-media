'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SnackbarContextType {
    snackbar: {
        status: number, // 0: success, 1: error, 2: warning, 3: info
        message: string,
        duration?: number,
    };
    showing: boolean;
    showSnackbar: (time: number, status: number, message: string) => void;
    hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

interface SnackbarProviderProps {
    children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [snackbar, setSnackbar] = useState<{
        status: number;
        message: string;
        duration?: number;
    }>({
        status: 0,
        message: '',
    });

    const [showing, setShowing] = useState(false);

    function showSnackbar(time: number, status: number, message: string) {
        if (!time) {
            setSnackbar({
                status: status,
                message: message,
            });
            setShowing(true);
            return;
        }
        setSnackbar({
            status: status,
            message: message,
            duration: time,
        });
        setShowing(true);
        setTimeout(() => {
            setShowing(false);
        }, time);
    }
    function hideSnackbar() {
        setShowing(false);
    }
    return (
        <SnackbarContext.Provider value={{ snackbar, showing, showSnackbar, hideSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
}
