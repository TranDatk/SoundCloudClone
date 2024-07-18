'use client'

import { createContext, useContext, useState } from "react";

const UserContext = createContext<IUserContext | null>(null)

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const initValue = {
        _id: '',
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
        pk: 0,
        name: "",
        permissions: null,
        type: '',
        isPrenium: false,
        isVerify: false,
        haveUserAccessed: false
    }
    const [currentUser, setCurrentUser] = useState<IShareUser>(initValue);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => useContext(UserContext);