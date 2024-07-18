import UploadTabs from "@/components/track/upload.tabs";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation"
import { sendRequest } from "@/utils/api";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tải lên bài Track',
    description: 'mô tả',
}

const UploadPage = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/")
    }

    const res = await sendRequest<IBackendRes<IGenre[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}genres/`,
        method: "GET",
    })
    return (
        <Container>
            <UploadTabs
                genres={res?.data ?? []}
            />
        </Container>
    )
}

export default UploadPage;