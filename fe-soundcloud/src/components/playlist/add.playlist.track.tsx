'use client'
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useToast } from '@/utils/toast';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

interface IProps {
    playlists: IPlaylist[];
    tracks: ITrack[];
}

const AddPlaylistTrack = (props: IProps) => {
    const { playlists, tracks } = props;

    const [open, setOpen] = useState(false);
    const toast = useToast();
    const router = useRouter();
    const { data: session } = useSession();

    const [playlistId, setPlaylistId] = useState('');
    const [tracksId, setTracksId] = useState<string[]>([]);

    const theme = useTheme();

    const handleClose = (event: any, reason: any) => {
        if (reason && reason == "backdropClick")
            return;
        setOpen(false);
        setPlaylistId('');
        setTracksId([]);
    };

    const getStyles = (name: string, tracksId: readonly string[], theme: Theme) => {
        return {
            fontWeight:
                tracksId.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleSubmit = async () => {
        if (!playlistId) {
            toast.error("Vui lòng chọn playlist!")
            return;
        }
        if (!tracksId.length) {
            toast.error("Vui lòng chọn tracks!")
            return;
        }


        const chosenPlaylist = playlists.find(i => i._id === playlistId);
        let tracks = tracksId?.map(item => item?.split("###")?.[1]);

        //remove null/undefined/empty
        tracks = tracks?.filter((item) => item);
        if (chosenPlaylist) {
            const res = await sendRequest<IBackendRes<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}playlists/${chosenPlaylist?._id}`,
                method: "PATCH",
                body: {
                    "track": tracks
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                }
            })

            if (res?.data) {
                toast.success("Thêm track vào playlist thành công!");
                await sendRequest<IBackendRes<any>>({
                    url: `/api/revalidate`,
                    method: "POST",
                    queryParams: {
                        tag: "playlist-by-user",
                    }
                })
                handleClose("", "");
                router.refresh();
            } else {
                toast.error(res.message)
            }
        }
    }

    return (
        <>
            <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setOpen(true)}>Tracks</Button>

            <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
                <DialogTitle>Thêm track vào playlist:</DialogTitle>
                <DialogContent >

                    <Box width={"100%"} sx={{ display: "flex", gap: "30px", flexDirection: "column" }}>
                        <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
                            <InputLabel>Chọn playlist</InputLabel>
                            <Select
                                value={playlistId}
                                label="Playlist"
                                onChange={(e) => setPlaylistId(e.target.value)}
                            >
                                {playlists.map(item => {
                                    return (
                                        <MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl sx={{ mt: 5, width: "100%" }}>
                            <InputLabel id="demo-multiple-chip-label">Track</InputLabel>
                            <Select
                                multiple
                                value={tracksId}
                                onChange={(e) => {
                                    setTracksId(e.target.value as any)
                                }}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map(value => {
                                            return (
                                                <Chip key={value} label={value?.split("###")?.[0]} />
                                            )
                                        })}
                                    </Box>
                                )}
                            >
                                {tracks.map((track) => {
                                    return (
                                        <MenuItem
                                            key={track._id}
                                            value={`${track.title}###${track._id}`}
                                            style={getStyles(`${track.title}###${track._id}`, tracksId, theme)}
                                        >
                                            {track.title}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose("", "")}>Cancel</Button>
                    <Button onClick={() => handleSubmit()}>Save</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default AddPlaylistTrack;