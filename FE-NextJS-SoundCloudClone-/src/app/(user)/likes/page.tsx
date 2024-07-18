
import type { Metadata } from 'next'
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { convertSlugUrl, sendRequest } from '@/utils/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Tracks bạn đã thích',
    description: 'mô tả',
}

const LikePage = async () => {
    const session = await getServerSession(authOptions);

    const res = await sendRequest<IBackendRes<IModelPaginate<ILike[]>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}likes`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        nextOption: {
            next: { tags: ['liked-by-user'] }
        }
    })

    const likes = res?.data?.results ?? [];

    return (
        <Container>
            <div>
                <h3>Hear the tracks you've liked:</h3>
            </div>
            <Divider />
            <Box sx={{ mt: 3, display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {likes.map(like => {
                    return (
                        <Box key={like._id}>
                            <img
                                style={{ borderRadius: "3px" }}
                                alt="avatar track"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC}${like?.track?.photo}`}
                                height={200}
                                width={200}
                            />
                            <div>
                                <Link
                                    style={{ textDecoration: "none", color: "unset" }}
                                    href={
                                        `/track/${convertSlugUrl(like?.track?.title)}-${like?.track?._id}.html`}
                                >
                                    <span
                                        style={{
                                            width: "200px",
                                            display: "block",
                                            color: "black",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"

                                        }}
                                    >
                                        {like?.track?.title}
                                    </span>
                                </Link>
                            </div>
                        </Box>

                    )
                })}

            </Box>
        </Container>
    )
}

export default LikePage;