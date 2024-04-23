import React from "react";
import { NewUser } from "@/libs/types";

interface ContextProps {
    currentUser: NewUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<NewUser>>;
    followUser: (followId: string) => Promise<boolean>;
    unfollowUser: (followId: string) => Promise<boolean>;
    loadingCurrentUser: boolean;
}

const defaultValue: ContextProps = {
    currentUser: {} as NewUser,
    setCurrentUser: () => { },
    loadingCurrentUser: true,
    followUser: async () => false,
    unfollowUser: async () => false
};

export const CurrentUserContext = React.createContext<ContextProps>(defaultValue);

export const CurrentUserProvider = ({ children }: { children: React.ReactNode; }) => {
    const [currentUser, setCurrentUser] = React.useState({} as NewUser);
    const [loadingCurrentUser, setLoadingCurrentUser] = React.useState(true);
    React.useEffect(() => {
        setLoadingCurrentUser(true);
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/network/me`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data);
                setLoadingCurrentUser(false);
            })
            .catch(error => {
                console.error(error);
                setLoadingCurrentUser(false);
            });
    }, []);

    const refreshCurrentUser = () => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/network/me`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => setCurrentUser(data))
            .catch(error => console.error(error));
    }

    const followUser = async (followId: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/network/follow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ followId }),
            cache: 'no-store'
        })
        const data = await res.json()
        if (data.message === "Followed") {
            refreshCurrentUser()
            return true
        }
        return false
    };

    const unfollowUser = async (followId: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/network/unfollow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ followId }),
            cache: 'no-store'
        })
        const data = await res.json()
        if (data.message === "Unfollowed") {
            refreshCurrentUser()
            return true
        }
        return false
    };

    return (
        <CurrentUserContext.Provider value={{
            currentUser, setCurrentUser, followUser, unfollowUser, loadingCurrentUser
        }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);
