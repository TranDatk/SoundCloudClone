
import { CardMedia, Container, Grid } from "@mui/material";
import { getIdFromUrl, sendRequest } from '@/utils/api';
import Divider from '@mui/material/Divider';
import { Box } from "@mui/material";
import WaveTrack from "@/components/track/wave.track";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = getIdFromUrl(params.slug);

    const res = await sendRequest<IBackendRes<ITrack>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/${id}/`,
        method: "GET",
        nextOption: { next: { tags: ['track-by-id'] } }
    })

    return {
        title: res?.data?.title,
        description: res?.data?.description,
        openGraph: {
            title: res?.data?.title,
            description: res?.data?.description,
            type: 'website',
            images: [`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC}${res?.data?.photo}`],
        },
    }
}

export async function generateStaticParams() {
    return [
        { slug: 'nam-doi-ban-tay-kay-tran-66850079c52d5614696bd9ba.html' },
        { slug: 'cham-khe-tim-anh-mot-chut-thoi-6684189971843975cf6b45df.html' },
        { slug: 'chiec-khan-gio-am-tien-cookie-6684fe9ac52d5614696bd9ab.html' },
        { slug: 'khi-nguoi-minh-yeu-khoc-phan-manh-quynh-6685026ec52d5614696bd9c9.html' },
        { slug: 'cham-lan-moi-em-andree-hoang-ton-tinle-66850447c52d5614696bd9d8.html' },
        { slug: 'happy-ending-erik-66850559c52d5614696bd9e7.html' },
        { slug: 'kill-eva-encassator-psycho-dreams-668d5b24fec3c90e0cce16e0.html' },
        { slug: 'floki-evse-voruyu-668d5c48fec3c90e0cce172c.html' },
        { slug: 'brodyaga-funk-668e4c2df538984a22937ef6.html' },
    ]
}

const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {
    const session = await getServerSession(authOptions);
    const id = getIdFromUrl(params.slug);
    const res = await sendRequest<IBackendRes<ITrack>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/${id}/`,
        method: "GET",
        nextOption: { next: { tags: ['track-by-id'] } }
    })

    const resComments = await sendRequest<IBackendRes<IComment[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}comments/${id}/fetch-comments`,
        method: "GET",
        nextOption: { cache: "no-store" }
    });

    const resFollow = await sendRequest<IBackendRes<IFollow>>({
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}followers/${res?.data?.user?._id}`,
        method: "GET",
        nextOption: { next: { tags: ['follow'] } }
    });

    if (res.statusCode === 404) {
        notFound();
    }

    return (
        <Container>
            {res.data && (
                <WaveTrack
                    id={id}
                    track={res.data}
                    comments={resComments.data?.reverse() ?? []}
                    isFollow={resFollow?.data?.isFollow ?? false}
                />
            )}
        </Container>
    )
}

export default DetailTrackPage;