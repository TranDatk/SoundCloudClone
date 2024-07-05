'use client'
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

import { useToast } from '@/utils/toast';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

const NewPlaylist = (props: any) => {
    const [open, setOpen] = useState(false);

    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const toast = useToast();
    const router = useRouter();
    const { data: session } = useSession();

    const handleClose = (event: any, reason: any) => {
        if (reason && reason == "backdropClick")
            return;
        setOpen(false);
    };

    const handleSubmit = async () => {
        if (!title) {
            toast.error("Tiêu đề không được để trống!")
            return;
        }
        const res = await sendRequest<IBackendRes<IPlaylist>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}playlists`,
            method: "POST",
            body: {
                title: title,
                status: isPublic,
                description: description,
                track: []
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            }
        })

        if (res?.data) {
            toast.success("Tạo mới playlist thành công!");
            setIsPublic(true);
            setTitle("");

            setOpen(false);

            await sendRequest<IBackendRes<any>>({
                url: `/api/revalidate`,
                method: "POST",
                queryParams: {
                    tag: "playlist-by-user",
                }
            })
            router.refresh();
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div>
            <Button variant="outlined" startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
            >
                Playlist
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
                <DialogTitle>  Thêm mới playlist:</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: "flex", gap: "30px", flexDirection: "column", width: "100%" }}>
                        <TextField
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            label="Tiêu đề"
                            variant="standard"
                        />
                        <TextField
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            label="Mô tả"
                            variant="standard"
                        />
                        <FormGroup>
                            <FormControlLabel control={
                                <Switch
                                    checked={isPublic}
                                    onChange={(event) => setIsPublic(event.target.checked)}
                                    inputProps={{ 'aria-label': 'controlled' }}

                                />}
                                label={isPublic === true ? "Public" : "Private"}
                            />
                        </FormGroup>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => handleSubmit()}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewPlaylist;