'use client'

import { createContext, useContext, useState } from "react";

const TrackContext = createContext<ITrackContext | null>(null)

export const TrackContextProvider = ({ children }: { children: React.ReactNode }) => {
    const initValue = {
        id: 0,
        fk_genre: { id: 0, name: "", description: "" },
        fk_user: { id: 0, username: "", password: "", email: "", first_name: "", last_name: "", avatar: "", pk: 0 },
        description: "",
        photo: "",
        title: "",
        url: "",
        like: 0,
        view: 0,
        isPlaying: false,
    }
    const [currentTrack, setCurrentTrack] = useState<IShareTrack>(initValue);

    return (
        <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
            {children}
        </TrackContext.Provider>
    )
};

export const useTrackContext = () => useContext(TrackContext);