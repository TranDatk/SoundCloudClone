import ProfileTracks from "@/components/header/profile.tracks";
import { sendRequest } from "@/utils/api";
import { Container, Grid } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Thông tin của bạn',
    description: 'Mô tả',
}

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
    const res = await sendRequest<IBackendRes<ITrack[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/user/`,
        method: "post",
        body: { user_id: `${params.slug}` },
        nextOption: {
            next: { tags: ['track-by-profile'] }
        }
    })

    const data = res?.results ?? []

    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={5}>
                {data.map((item: any, index: number) => {
                    return (
                        <Grid item xs={12} md={6} key={index}>
                            <ProfileTracks data={item} />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>

    )
}

export default ProfilePage;