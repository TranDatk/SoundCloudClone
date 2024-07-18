"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import { convertSlugUrl } from "@/utils/api";

interface IProps {
    tracks: ITrack[],
    title: string
}

const MainSlider = (props: IProps) => {
    const { tracks, title } = props;

    const NextArrow = (props: any) => {
        return (
            <Button color="inherit" variant="contained" onClick={props.onClick}
                sx={{
                    position: "absolute",
                    right: 40,
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35
                }}>
                <ChevronRightIcon />
            </Button>
        )
    }

    const PrevArrow = (props: any) => {
        return (
            <Button color="inherit" variant="contained" onClick={props.onClick}
                sx={{
                    position: "absolute",
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35
                }}>
                <ChevronLeftIcon />
            </Button>
        )
    }

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    nextArrow: <></>,
                    prevArrow: <></>,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    nextArrow: <></>,
                    prevArrow: <></>,
                },
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 3,
                    nextArrow: <></>,
                    prevArrow: <></>,
                },
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 2,
                    nextArrow: <></>,
                    prevArrow: <></>,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    nextArrow: <></>,
                    prevArrow: <></>,
                },
            },
        ],
    };
    return (
        <Box sx={{
            margin: "50px 50px",
            ".track": {
                padding: "0 10px",
                "img": {
                    height: 150,
                    width: 150
                },
                "h4": {
                    width: 150,
                }
            },
            "h3": {
                border: "1px solid #ccc",
                padding: "20px",
                height: "200px",
            }
        }}>
            <h2>{title}</h2>
            <Slider {...settings}>
                {Array.isArray(tracks) && tracks.map(track => {
                    return (
                        <div className="track" key={track._id}>
                            <Link
                                href={`/track/${convertSlugUrl(track?.title)}-${track?._id}.html`}
                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC}${track?.photo}`} alt="track" />
                                <h4>{track.title}</h4>
                            </Link>
                        </div>
                    )
                })
                }
            </Slider>
        </Box>
    );

}
export default MainSlider;