'use client'
import { sendRequest } from '@/utils/api';
import { Box, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useState, useTransition } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dayjs from 'dayjs';
import WaveSurfer from "wavesurfer.js";

import relativeTime from 'dayjs/plugin/relativeTime';
import { useHasMounted } from '@/utils/customHook';
dayjs.extend(relativeTime)

interface IProps {
    comments: IComment[];
    track: ITrack | null;
    wavesurfer: WaveSurfer | null;
}

const CommentTrack = (props: IProps) => {
    const router = useRouter();

    const { comments, track, wavesurfer } = props;
    const [yourComment, setYourComment] = useState("");
    const { data: session } = useSession();
    const hasMounted = useHasMounted();


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    const handleSubmit = async () => {

        const res = await sendRequest<IBackendRes<IComment>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}comments/`,
            method: "POST",
            body: {
                commentText: yourComment,
                moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
                track: track?._id,
                user: session?.user._id
            },

            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },

        })
        if (res?.data) {
            setYourComment("");
            router.refresh()
        }
    }

    const handleJumpTrack = (moment: number) => {
        if (wavesurfer) {
            const duration = wavesurfer.getDuration();
            wavesurfer.seekTo(moment / duration);
            wavesurfer.play();
        }
    }

    return (
        <div>
            <div style={{ marginTop: "50px", marginBottom: "25px" }}>
                {session?.user &&
                    <TextField
                        value={yourComment}
                        onChange={(e) => setYourComment(e.target.value)}

                        fullWidth label="Comments" variant="standard"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit()
                            }
                        }}

                    />
                }
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
                <div className='left'
                    style={{
                        width: 'auto',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                    <img
                        style={{
                            height: '10vw', width: '10vw', borderRadius: "50%"
                        }}
                        src={track?.user?.avatar !== "" && track?.user?.avatar !== null && track?.user?.avatar !== undefined ?
                            `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC}${track?.user?.avatar}` :
                            "/avatars-000184820148-9xr49w-t240x240.jpg"}
                    />
                    <h3 style={{ fontSize: '1.5vw' }}>{track?.user?.name}</h3>
                </div>
                <div className='right' style={{ width: "calc(100% - 200px)" }}>
                    {comments?.map(comment => {
                        return (
                            <Box key={comment._id} sx={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", gap: "10px", marginBottom: "25px", alignItems: "center" }}>
                                    {
                                        comment?.user?.type === 'CREDENTIAL' ? <img
                                            style={{
                                                height: 40, width: 40, borderRadius: "50%"

                                            }}
                                            src={comment?.user?.avatar !== "" && comment?.user?.avatar !== null && comment?.user?.avatar !== undefined ?
                                                `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC}${comment?.user?.avatar}` :
                                                "/avatars-000184820148-9xr49w-t240x240.jpg"}
                                        />
                                            :
                                            <img
                                                style={{
                                                    height: 40, width: 40, borderRadius: "50%"

                                                }}
                                                src={comment?.user?.avatar !== "" && comment?.user?.avatar !== null && comment?.user?.avatar !== undefined ?
                                                    `${comment?.user?.avatar}` :
                                                    "/avatars-000184820148-9xr49w-t240x240.jpg"}
                                            />
                                    }
                                    <div>
                                        <div style={{ fontSize: "13px" }}>{comment?.user?.name ?? comment?.user?.email} at
                                            <span style={{ cursor: "pointer" }}
                                                onClick={() => handleJumpTrack(comment.moment)}
                                            >
                                                &nbsp; {formatTime(comment.moment)}
                                            </span>
                                        </div>
                                        <div>
                                            {comment.commentText}
                                        </div>
                                    </div>
                                </Box>
                                <div style={{ fontSize: "12px", color: "#999" }}>
                                    {hasMounted && dayjs(comment?.createdAt).fromNow()}
                                </div>
                            </Box>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommentTrack;