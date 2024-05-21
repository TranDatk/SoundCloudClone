'use client'
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useState } from 'react';
import { sendRequest } from '@/utils/api';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface IProps {
    track: ITrack | null;
}
const LikeTrack = (props: IProps) => {
    const { track } = props;
    const { data: session } = useSession();
    const [like, setLike] = useState<ILike | null>(null);
    const router = useRouter();

    const fetchData = async () => {
        if (session?.access_token) {
            const res2 = await sendRequest<IBackendRes<ILike>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/like/liked-track/`,
                method: "POST",
                body: {
                    fk_tracks: track?.id,
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
            })
            if (res2?.results) {
                setLike(res2?.results)
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [session])

    const handleLikeTrack = async () => {
        await sendRequest<IBackendRes<ITrack>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/like/`,
            method: "POST",
            body: {
                fk_tracks: track?.id,
                like: !like?.like
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        })
        fetchData();
        await sendRequest<IBackendRes<any>>({
            url: `/api/revalidate`,
            method: "POST",
            queryParams: {
                tag: "liked-by-user",
            }
        })

        await sendRequest<IBackendRes<any>>({
            url: `/api/revalidate`,
            method: "POST",
            queryParams: {
                tag: "track-by-id",
            }
        })

        router.refresh()
    }

    return (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Chip
                onClick={() => handleLikeTrack()}
                sx={{ borderRadius: "5px" }}
                size="medium"
                variant="outlined"
                color={like?.like ? "error" : "default"}
                clickable
                icon={<FavoriteIcon />} label="Like"
            />
            <div style={{ display: "flex", gap: "20px", color: "#999" }}>
                <span style={{ display: "flex", alignItems: "center" }}><PlayArrowIcon sx={{ fontSize: "20px" }} /> {track?.view}</span>
                <span style={{ display: "flex", alignItems: "center" }}><FavoriteIcon sx={{ fontSize: "20px" }} /> {track?.like}</span>
            </div>
        </div>
    )
}

export default LikeTrack;