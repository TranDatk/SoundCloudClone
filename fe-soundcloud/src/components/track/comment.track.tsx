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
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/`,
            method: "POST",
            body: {
                comment_text: yourComment,
                moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
                fk_tracks: track?.id,
                fk_user: session?.user.id ?? session?.user.pk
            },

            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },

        })
        if (res.results) {
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
            {/* {`${process.env.NEXT_PUBLIC_BACKEND_URL}${track?.fk_user.avatar}`} */}
            <div style={{ display: "flex", gap: "10px" }}>
                <div className='left' style={{ width: "190px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img
                        style={{
                            height: 150, width: 150, borderRadius: "50%"
                        }}
                        src={track?.fk_user.avatar !== "" && track?.fk_user.avatar !== null && track?.fk_user.avatar !== undefined ?
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}${track?.fk_user.avatar}` :
                            "/avatars-000184820148-9xr49w-t240x240.jpg"}
                    />
                    <h3>{track?.fk_user.username}</h3>
                </div>
                <div className='right' style={{ width: "calc(100% - 200px)" }}>
                    {comments?.map(comment => {
                        return (
                            <Box key={comment.id} sx={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", gap: "10px", marginBottom: "25px", alignItems: "center" }}>
                                    <img
                                        style={{
                                            height: 40, width: 40, borderRadius: "50%"

                                        }}
                                        src={comment?.fk_user.avatar !== "" && comment?.fk_user.avatar !== null && comment?.fk_user.avatar !== undefined ?
                                            `${process.env.NEXT_PUBLIC_BACKEND_URL}${comment?.fk_user.avatar}` :
                                            "/avatars-000184820148-9xr49w-t240x240.jpg"}
                                    />
                                    <div>
                                        <div style={{ fontSize: "13px" }}>{comment?.fk_user.username ?? comment?.fk_user.email} at
                                            <span style={{ cursor: "pointer" }}
                                                onClick={() => handleJumpTrack(comment.moment)}
                                            >
                                                &nbsp; {formatTime(comment.moment)}
                                            </span>
                                        </div>
                                        <div>
                                            {comment.comment_text}
                                        </div>
                                    </div>
                                </Box>
                                <div style={{ fontSize: "12px", color: "#999" }}>
                                    {hasMounted && dayjs(comment.created_date).fromNow()}
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