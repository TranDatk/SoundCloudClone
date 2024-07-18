'use client'

import { Container } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import './dropzone.scss';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { sendRequest } from "@/utils/api";
import { useToast } from "@/utils/toast";
import { useRouter } from 'next/navigation';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
                width: '100%',
                mr: 1,
                '.mui-5xe99f-MuiLinearProgress-bar1': { backgroundColor: "orange" },
                '.mui-eglki6-MuiLinearProgress-root': { backgroundColor: "gray" }
            }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function LinearWithValueLabel(trackUpload: {
    trackUpload: {
        fileName: string;
        percent: number;
        url: string;
    }
}) {

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={trackUpload.trackUpload.percent} />
        </Box>
    );
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface IProps {
    trackUpload: {
        fileName: string;
        percent: number;
        url: string;
    },
    genres: IGenre[],
    setValue: (v: number) => void;
}

interface INewTrack {
    genre: string;
    description: string;
    photo: string;
    title: string;
    url: string;
}



const Step2 = (props: IProps) => {
    const toast = useToast();
    const router = useRouter();
    const { genres, trackUpload, setValue } = props;
    const { data: session } = useSession();
    const [infor, setInfor] = useState<INewTrack>({
        genre: "",
        description: "",
        photo: "",
        title: "",
        url: ""
    });

    const [error, setError] = useState({
        title: {
            error: false,
            errorMessage: 'Tiêu đề không được bỏ trống'
        },
        description: {
            error: false,
            errorMessage: 'Mô tả không được để trống'
        },
        genre: {
            error: false,
            errorMessage: 'Thể loại chưa được chọn'
        },
    });

    function InputFileUpload() {
        const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const event = e.target as HTMLInputElement;
            if (event.files) {
                const file = event.files[0];
                if (file.type.startsWith('image/')) {
                    const formData = new FormData();
                    formData.append("file", file, file.name);
                    if (trackUpload?.url !== null) {
                        handleFileUpload(formData);
                    } else {
                        toast.error("Vui lòng đợi quá trình tải âm thanh hoàn thành")
                    }

                } else {
                    toast.error("Vui lòng tải lên đúng định dạng ảnh")
                }
            }
        };

        return (
            <Button
                component="label"
                variant="contained"
                sx={{
                    background: 'rgb(255, 85, 0)',
                    '&:hover': {
                        background: 'rgb(255, 50, 0)',
                    },
                }}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{ display: "none" }}
                />
            </Button>
        );
    }

    const handleFileUpload = async (formData: FormData) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}files/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${session?.access_token}`,
                },
            })
            setInfor({
                ...infor,
                photo: res?.data?.data?.fileName ?? ''
            })
        } catch (error) {
            //@ts-ignore
            const errorMessage = error?.response?.data?.message;
            toast.error(errorMessage ?? "Lỗi khi tải ảnh")
        }
    }

    const handleSubmitForm = async () => {
        if (infor.title === '') {
            toast.error("Tiêu đề đang bị bỏ trống");
            return;
        } else if (infor.description === '') {
            toast.error("Mô tả đang bị bỏ trống");
            return;
        } else if (trackUpload.percent !== 100) {
            toast.error("Quá trình tải âm thanh chưa hoàn tất, vui lòng đợi trong giây lát");
            return;
        } else if (infor.genre === '') {
            toast.error("Thể loại chưa được lựa chọn");
            const newErrorState = {
                ...error,
                genre: {
                    error: true,
                    errorMessage: error.genre.errorMessage
                }
            };
            setError(newErrorState);
            return;
        } else if (infor.photo === '') {
            toast.error("Hình ảnh chưa được chọn");
            return;
        }

        const resPop = await sendRequest<IBackendRes<ITrack>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/`,
            method: "POST",
            headers: {
                'Authorization': `Bearer ${session?.access_token}`,
            },
            body: {
                url: trackUpload.url,
                title: infor.title,
                description: infor.description,
                genre: infor.genre,
                photo: infor.photo
            }
        })
        if (resPop.error) {
            toast.error("Tạo Track thất bại");
        } else {
            setValue(0)
            await sendRequest<IBackendRes<any>>({
                url: `/api/revalidate`,
                method: "POST",
                queryParams: {
                    tag: "track-by-profile",
                }
            });
            router.refresh();
            toast.success("Tạo Track thành công");
        }
    }

    return (
        <div>
            <div>
                <div>
                    {trackUpload?.url}
                </div>
                <LinearWithValueLabel
                    trackUpload={trackUpload}
                />
            </div>

            <Grid container spacing={2} mt={5}>
                <Grid item xs={6} md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <div style={{ height: 250, width: 250, background: "#ccc" }}>
                        {infor.photo !== '' && (
                            <img
                                src={process.env.NEXT_PUBLIC_BACKEND_PUBLIC + (infor.photo) || ""}
                                width={250}
                                height={250}
                                alt={infor.title}
                            />
                        )}

                    </div>
                    <div >
                        <InputFileUpload />
                    </div>

                </Grid>
                <Grid item xs={6} md={8}>
                    <TextField
                        label="Title"
                        variant="standard"
                        required
                        fullWidth margin="dense"
                        value={infor?.title ?? props.trackUpload.fileName.split('.').slice(0, -1).join('.')}
                        error={error.title.error}
                        helperText={error.title.error ? error.title.errorMessage : ''}
                        onChange={(e) => {
                            const descriptionValue = e.target.value.trim();
                            const newErrorState = {
                                ...error,
                                title: {
                                    error: descriptionValue === '',
                                    errorMessage: error.title.errorMessage
                                }
                            };
                            setError(newErrorState);
                            setInfor({
                                ...infor,
                                title: descriptionValue
                            });
                        }}
                    />
                    <TextField
                        label="Description"
                        variant="standard"
                        fullWidth
                        margin="dense"
                        required
                        value={infor?.description ?? ""}
                        error={error.description.error}
                        helperText={error.description.error ? error.description.errorMessage : ''}
                        onChange={(e) => {
                            const descriptionValue = e.target.value.trim();
                            const newErrorState = {
                                ...error,
                                description: {
                                    error: descriptionValue === '',
                                    errorMessage: error.description.errorMessage
                                }
                            };
                            setError(newErrorState);
                            setInfor({
                                ...infor,
                                description: e.target.value
                            })
                        }}
                    />
                    <TextField
                        sx={{
                            mt: 3
                        }}
                        select
                        label="Genre"
                        fullWidth
                        variant="standard"
                        value={infor?.genre ?? ""}
                        error={error.genre.error}
                        helperText={error.genre.error ? error.genre.errorMessage : ''}
                        onChange={(e) => {
                            const newErrorState = {
                                ...error,
                                genre: {
                                    error: e.target.value ? false : true,
                                    errorMessage: error.genre.errorMessage
                                }
                            };
                            setError(newErrorState);
                            setInfor({
                                ...infor,
                                genre: e.target.value
                            })
                        }}
                    >
                        {genres.map((genre) => (
                            <MenuItem key={genre._id} value={genre._id}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 5
                        }}
                        onClick={() => {
                            handleSubmitForm()
                        }}
                    >Save</Button>
                </Grid>
            </Grid>

        </div>
    )
}

export default Step2;