'use client'

import { convertSlugUrl, sendRequest } from '@/utils/api';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { Typography } from '@mui/material';
import Image from 'next/image';

const ClientSearch = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [tracks, setTracks] = useState<ITrack[]>([]);

    const fetchData = async (query: string) => {
        const res = await sendRequest<IBackendRes<ITrack[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/search/`,
            method: "POST",
            body: {
                keyword: query
            }
        })
        if (res.results) {
            setTracks(res.results)
        }
    }

    useEffect(() => {
        //update document title by query
        document.title = `"${query}" trên Sound cloud`;

        //fetch data
        if (query)
            fetchData(query);

    }, [query])

    return (
        <div>
            {(!query || !tracks.length)
                ?
                <div>Không tồn tại kết quả tìm kiếm</div>
                :
                <Box>
                    <div>Kết quả tìm kiếm cho từ khóa: <b>{query}</b></div>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        {tracks.map((track) => {
                            return (
                                <div key={track.id}>
                                    <Box sx={{ display: "flex", width: "100%", gap: "20px" }}>
                                        <Image
                                            style={{ borderRadius: "3px" }}
                                            alt="avatar track"
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${track?.photo}`}
                                            height={50}
                                            width={50}
                                        />
                                        <Typography sx={{ py: 2 }}>
                                            <Link
                                                style={{ textDecoration: "none", color: "unset" }}
                                                href={`/track/${convertSlugUrl(track.title)}-${track.id}.html?audio=${track.title}`}
                                            >
                                                {track.title}
                                            </Link>
                                        </Typography>
                                    </Box>
                                </div>
                            )
                        })}
                    </Box>
                </Box>
            }
        </div>
    )
}

export default ClientSearch;
