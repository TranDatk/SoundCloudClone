'use client'

import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import { createRoot } from 'react-dom/client'
import { useWavesurfer } from '@wavesurfer/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './wave.scss'
import { calLeft } from "@/utils/utils";
import { Tooltip } from "@mui/material";
import { useTrackContext } from "@/lib/track.wrapper";
import CommentTrack from "./comment.track";
import LikeTrack from "./like.track";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

interface IProps {
    id: string;
    track: ITrack;
    comments: IComment[];
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secondsRemainder = Math.round(seconds) % 60
    const paddedSeconds = `0${secondsRemainder}`.slice(-2)
    return `${minutes}:${paddedSeconds}`
}


const WaveTrack = (props: IProps) => {
    const router = useRouter();
    const { track, id, comments } = props;
    const containerRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);
    const hoverRef = useRef<HTMLInputElement>(null);
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const { data: session } = useSession();
    const [firstTimeOnPage, setFirstTimeOnPage] = useState<boolean>(true)

    const options: Omit<WaveSurferOptions, 'container'> & { container: RefObject<HTMLElement>; } = useMemo(() => {
        if (typeof document === 'undefined') {
            return {
                container: containerRef,
                height: 0,
                waveColor: "",
                progressColor: "",
                url: '',
                barWidth: 0,
            };
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        // Define the waveform gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
        gradient.addColorStop(0, '#656666'); // Top color
        gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666'); // Top color
        gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff'); // White line
        gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff'); // White line
        gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1'); // Bottom color
        gradient.addColorStop(1, '#B1B1B1'); // Bottom color

        // Define the progress gradient
        const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
        progressGradient.addColorStop(0, '#EE772F'); // Top color
        progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926'); // Top color
        progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff'); // White line
        progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff'); // White line
        progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094'); // Bottom color
        progressGradient.addColorStop(1, '#F6B094'); // Bottom color

        return {
            container: containerRef,
            height: 100,
            waveColor: gradient,
            progressColor: progressGradient,
            url: `/api?audio=${id}`,
            barWidth: 3,
            renderFunction: (peaks: Array<Float32Array | number[]>, ctx: CanvasRenderingContext2D) => {
                const { width, height } = ctx.canvas;
                const barWidth = options.barWidth || 2;
                const barGap = options.barGap || 1;
                const barRadius = options.barRadius || 0;
                const separationLineHeight = 0.5; // Height of the separation line

                const barCount = Math.floor(width / (barWidth + barGap));
                const step = Math.floor(peaks[0].length / barCount);

                const topPartHeight = height * 0.7; // Define top part height
                const bottomPartHeight = height * 0.3; // Define bottom part height

                ctx.beginPath();

                for (let i = 0; i < barCount; i++) {
                    let sumTop = 0;
                    let sumBottom = 0;

                    for (let j = 0; j < step; j++) {
                        const index = i * step + j;
                        const topValue = Math.abs(peaks[0][index] || 0);
                        const bottomValue = Math.abs(peaks[1]?.[index] || 0);

                        sumTop += topValue;
                        sumBottom += bottomValue;
                    }

                    const avgTop = sumTop / step;
                    const avgBottom = sumBottom / step;

                    // const barHeight = (avgTop + avgBottom)/2;

                    const barHeight = (avgTop + avgBottom) * 1.2;

                    // Vertical alignment
                    let yTop = topPartHeight - (barHeight * topPartHeight);
                    let yBottom = topPartHeight + (barHeight * bottomPartHeight);

                    if (options.barAlign === 'top') {
                        yTop = 0;
                        yBottom = bottomPartHeight;
                    } else if (options.barAlign === 'bottom') {
                        yTop = height - topPartHeight;
                        yBottom = height;
                    }

                    ctx.rect(i * (barWidth + barGap), yTop, barWidth, barHeight * topPartHeight);
                    ctx.rect(i * (barWidth + barGap), yBottom - (barHeight * bottomPartHeight), barWidth, barHeight * bottomPartHeight);
                }

                ctx.fill();
                ctx.closePath();
            },
        };
    }, []);

    const { wavesurfer, currentTime, isReady } = useWavesurfer(options)

    useEffect(() => {
        if (!wavesurfer) return;
        setIsPlaying(false);

        const hover = hoverRef.current!;
        const waveform = containerRef.current!;
        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.once('interaction', () => {
                wavesurfer.play()
            })
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])


    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
        }
    }, [wavesurfer]);

    if (typeof document !== 'undefined') {
        const timeEl = timeRef.current!
        const durationEl = durationRef.current!
        wavesurfer && wavesurfer.on('decode', (duration) => (durationEl.textContent = formatTime(duration)))
        wavesurfer && wavesurfer.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime)))
    }

    useEffect(() => {
        if (wavesurfer && currentTrack.isPlaying) {
            wavesurfer.pause();
        }
    }, [currentTrack])

    useEffect(() => {
        if (track?.id && !currentTrack?.id)
            setCurrentTrack({ ...track, isPlaying: false })
    }, [track])

    const handleIncreaseView = async () => {
        if (session?.access_token && firstTimeOnPage) {
            const res = await sendRequest<IBackendRes<ITrack>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/increase-view/`,
                method: "POST",
                body: {
                    track_id: track?.id,
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
            })
            if (res?.results) {
                setFirstTimeOnPage(false);
                await sendRequest<IBackendRes<any>>({
                    url: `/api/revalidate`,
                    method: "POST",
                    queryParams: {
                        tag: "track-by-id",
                    }
                })
                router.refresh()
            }
        }
    }

    return (
        track !== undefined ? (
            <div style={{ marginTop: 20 }}>
                <div
                    style={{
                        display: "flex",
                        gap: 15,
                        padding: 20,
                        height: 400,
                        background: "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)"
                    }}
                >
                    <div className="left"
                        style={{
                            width: "75%",
                            height: "calc(100% - 10px)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}
                    >
                        <div className="info" style={{ display: "flex" }}>
                            <div>
                                <div
                                    onClick={() => {
                                        onPlayClick();
                                        handleIncreaseView();
                                        if (track && wavesurfer) {
                                            setCurrentTrack({ ...currentTrack, isPlaying: false })
                                        }
                                    }}
                                    style={{
                                        borderRadius: "50%",
                                        background: "#f50",
                                        height: "50px",
                                        width: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer"
                                    }}
                                >
                                    {isPlaying === true ?
                                        <PauseIcon
                                            sx={{ fontSize: 30, color: "white" }}
                                        />
                                        :
                                        <PlayArrowIcon
                                            sx={{ fontSize: 30, color: "white" }}
                                        />
                                    }
                                </div>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <div style={{
                                    maxWidth: "35rem",
                                    padding: "0 5px",
                                    background: "#333",
                                    fontSize: 25,
                                    width: "fit-content",
                                    color: "white"
                                }}>
                                    {track.title}
                                </div>
                                <div style={{
                                    padding: "0 5px",
                                    marginTop: 10,
                                    background: "#333",
                                    fontSize: 20,
                                    width: "fit-content",
                                    color: "white"
                                }}
                                >
                                    {track.fk_user.username}
                                </div>
                            </div>
                        </div>
                        <div ref={containerRef} className="wave-form">
                            <div className={`${isReady && 'time'}`} ref={timeRef}>{isReady && "0:00"}</div>
                            <div className={`${isReady && 'duration'}`} ref={durationRef}>{wavesurfer && ""}</div>
                            <div className={`${isReady && 'hover-wave'}`} ref={hoverRef}></div>
                            <div className={`${isReady && 'comments'}`}>
                                {
                                    isReady && comments.map((comment) => {
                                        return (
                                            <Tooltip key={`id=${comment.id}`} title={comment.comment_text} arrow>
                                                <img
                                                    className={`${isReady && 'img-comments'}`}
                                                    onPointerMove={(e) => {
                                                        const hover = hoverRef.current;
                                                        hover ? hover.style.width = calLeft(comment.moment + 3) : null;
                                                    }}
                                                    key={`id_img=${comment.id}`}
                                                    src={comment.fk_user.avatar !== '' && comment.fk_user.avatar !== null ?
                                                        `${process.env.NEXT_PUBLIC_BACKEND_URL}${comment.fk_user.avatar}` :
                                                        "/avatars-000184820148-9xr49w-t240x240.jpg"}
                                                    alt="sa"
                                                    style={{
                                                        left: calLeft(comment.moment)
                                                    }} />
                                            </Tooltip>

                                        )
                                    })
                                }
                            </div>
                            <div className={`${isReady && 'overlay-wave'}`}></div>
                        </div>
                    </div>
                    <div className="right"
                        style={{
                            width: "25%",
                            padding: 15,
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        {
                            track?.photo ? (<img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${track?.photo}`}
                                width={230}
                                height={230}
                                alt={"track"}
                            />
                            ) : <div style={{
                                background: "#ccc",
                                width: 250,
                                height: 250
                            }}>
                            </div>
                        }
                    </div>
                </div>
                <LikeTrack track={track} />
                <CommentTrack comments={comments} track={track} wavesurfer={wavesurfer} />
            </div >) :
            (<h1>Page not found</h1>)
    )
}

export default WaveTrack;