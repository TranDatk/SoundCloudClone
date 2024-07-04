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
    const [like, setLike] = useState<boolean>(false);
    const router = useRouter();

    const fetchData = async () => {
        if (session?.access_token) {
            const res2 = await sendRequest<IBackendRes<ILike>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}likes/check/${track?._id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
            })
            if (res2?.data) {
                setLike(res2?.data?.like)
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [session])

    const handleLikeTrack = async () => {
        await sendRequest<IBackendRes<ITrack>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}likes`,
            method: "POST",
            body: {
                track: track?._id,
                like: !like
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
                color={like ? "error" : "default"}
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