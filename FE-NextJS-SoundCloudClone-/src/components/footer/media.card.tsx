import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Image from 'next/image'

interface IProp {
    track: ITrack;
}

function constructPhotoUrl(track: ITrack): string {
    if (track.photo.startsWith("/")) {
        return `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC}${track.photo}`;
    } else {
        return `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC}${track.photo}`;
    }
}

export default function MediaControlCard(props: IProp) {
    const { track } = props;
    const theme = useTheme();

    return (
        track._id !== null && (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '30px', width: '100%', background: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px', width: '15%' }}>
                    {track?.photo && <img
                        style={{ alignSelf: 'center' }}
                        src={constructPhotoUrl(track)}
                        alt=""
                        width={30}
                        height={30}
                    />}
                </Box>
                <Box sx={{
                    flex: '1 0 auto', height: 30, fontSize: '0.5rem', width: '85%',
                }}>
                    <Typography sx={{
                        height: 15, fontSize: '0.8rem', color: 'black',
                        fontWeight: 500, overflow: 'hidden', // Ẩn nội dung vượt quá phạm vi của phần tử
                        textOverflow: 'ellipsis', // Hiển thị dấu chấm elipsis (...) cho nội dung bị ẩn
                        whiteSpace: 'nowrap'
                    }}>
                        {track.title}
                    </Typography>
                    <Typography sx={{ height: 15, fontSize: '0.8rem' }} color="text.secondary">
                        {track?.user?.name}
                    </Typography>
                </Box>
            </Box>)
    );
}
