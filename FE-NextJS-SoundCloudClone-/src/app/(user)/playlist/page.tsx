import Container from "@mui/material/Container";
import Box from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NewPlaylist from "../../../components/playlist/new.playlist";
import AddPlaylistTrack from "../../../components/playlist/add.playlist.track";
import { Fragment } from 'react';
import CurrentTrack from "../../../components/playlist/current.track";
import type { Metadata } from 'next'
import { extractNumberFromString } from "@/utils/utils";

export const metadata: Metadata = {
    title: 'Playlist bạn đã tạo',
    description: 'Mô tả',
}
// { params }: { params: { slug: string } },
const PlaylistPage = async ({ searchParams, }: { searchParams: { [key: string]: string | string[] | undefined }; }) => {
    const page = searchParams["page"] ?? "1";
    const session = await getServerSession(authOptions);

    const resPlaylist = await sendRequest<IBackendRes<IModelPaginate<IPlaylist[]>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}playlists`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        queryParams: { current: page },
        nextOption: {
            next: { tags: ['playlist-by-user'] }
        }
    })

    const resAllTrack = await sendRequest<IBackendRes<IModelPaginate<ITrack[]>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}tracks`,
        method: "GET",
        queryParams: { current: page, pageSize: 5 },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        }
    })

    const playlists = resPlaylist?.data?.results ?? [];
    return (
        <Container sx={{ mt: 3, p: 3, background: "#f3f6f9", borderRadius: "3px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Danh sách phát</h3>
                <div style={{ display: "flex", gap: "20px" }}>
                    <NewPlaylist />
                    <AddPlaylistTrack
                        playlists={playlists}
                        tracks={resAllTrack?.data?.results ?? []}
                    />
                </div>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ mt: 3 }}>
                {playlists?.map(playlist => {
                    return (
                        <Accordion key={playlist._id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}>
                                <Box sx={{ flexDirection: 'column', paddingLeft: "0 !important" }}>
                                    <Typography sx={{ fontSize: "20px", color: "black" }}>{playlist.title}</Typography>
                                    <Typography sx={{ fontSize: "14px", color: "#999" }}>{playlist.description}</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                {playlist?.track?.map((track: ITrack, index: number) => {
                                    return (
                                        <Fragment key={track._id}>
                                            {index === 0 && <Divider />}
                                            <CurrentTrack track={track} />
                                            <Divider />
                                        </Fragment>
                                    )
                                })}
                                {playlist?.track?.length === 0 && <span>No data.</span>}
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </Box>
        </Container>
    )
}

export default PlaylistPage;