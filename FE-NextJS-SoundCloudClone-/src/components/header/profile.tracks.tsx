'use client'

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
import { ListItem } from '@mui/material';
import { useTrackContext } from '@/lib/track.wrapper';
import PauseIcon from '@mui/icons-material/Pause';
import Link from "next/link";
import { convertSlugUrl } from '@/utils/api';

interface IProps {
    data: ITrack
}

const ProfileTracks = (props: IProps) => {
    const { data } = props;
    const theme = useTheme();
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

    return (
        <Card sx={{ display: 'flex', justifyContent: "space-between" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '70%', }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Link
                        href={`/track/${convertSlugUrl(data?.title)}-${data?._id}.html`}
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                            display: 'inline-block',
                            maxWidth: '100%',
                        }}
                    >
                        <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                        }}>
                            <Typography
                                component="div"
                                variant="h5"
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {data?.title}
                            </Typography>
                        </div>
                    </Link>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {data?.description}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme?.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            if (data._id !== currentTrack._id && currentTrack.isPlaying) {
                                setCurrentTrack({ ...data, isPlaying: currentTrack.isPlaying })
                            } else {
                                setCurrentTrack({ ...data, isPlaying: !currentTrack.isPlaying })
                            }
                        }}
                        aria-label="play/pause">
                        {currentTrack.isPlaying && data._id === currentTrack._id ?
                            (<PauseIcon sx={{ height: 38, width: 38 }} />) :
                            (<PlayArrowIcon sx={{ height: 38, width: 38 }} />)
                        }
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC}${data.photo}`}
                alt="Live from space album cover"
            />
        </Card>
    );
}

export default ProfileTracks;
