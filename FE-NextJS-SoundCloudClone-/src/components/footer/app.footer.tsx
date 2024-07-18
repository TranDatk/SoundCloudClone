'use client'
import { useTrackContext } from "@/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useContext, useEffect, useRef } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import MediaControlCard from "./media.card";

const AppFooter = () => {
    const hasMounted = useHasMounted();
    const playerRef = useRef(null)
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
    useEffect(() => {
        if (currentTrack?.isPlaying === true) {
            //@ts-ignore
            playerRef?.current?.audio?.current.play()
        } else {
            //@ts-ignore
            playerRef?.current?.audio?.current.pause()
        }
    }, [currentTrack])

    if (!hasMounted) return (<></>);

    return (
        <>
            {
                currentTrack._id !== null && currentTrack?.isPlaying && (
                    <div style={{ marginTop: 100 }}>
                        <AppBar
                            position="fixed"
                            sx={{
                                top: 'auto', bottom: 0, background: "#f2f2f2",
                            }}>
                            <Container sx={{
                                display: "flex", gap: 10,
                                ".rhap_main": { gap: "30px" },
                                ".rhap_progress-indicator": { background: "orange", width: "10px" },
                                ".rhap_progress-filled": { backgroundColor: "orange" },
                                "#rhap_current-time": { color: "orange" },
                            }}>
                                <AudioPlayer
                                    ref={playerRef}
                                    layout="horizontal-reverse"
                                    src={currentTrack?._id ? `/api?audio=${currentTrack?._id}` : ''}
                                    onPlay={() => {
                                        setCurrentTrack({ ...currentTrack, isPlaying: true });
                                    }}
                                    onPause={() => {
                                        setCurrentTrack({ ...currentTrack, isPlaying: false });
                                    }}
                                    style={{
                                        boxShadow: "unset",
                                        background: "#f2f2f2"
                                    }}
                                />
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "start",
                                    justifyContent: "center",
                                    width: '17rem',
                                    minWidth: 100
                                }}>
                                    <MediaControlCard track={currentTrack} />
                                </div>
                            </Container>
                        </AppBar>
                    </div >
                )
            }
        </>
    )
}

export default AppFooter;