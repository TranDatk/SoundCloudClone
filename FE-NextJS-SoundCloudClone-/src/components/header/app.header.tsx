'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"
import ActiveLink from './active.link';
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import { sendRequest } from '@/utils/api';
import { useUserContext } from "@/lib/user.wrapper";
import PersistentDrawerLeft from './drawer.header';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

export default function AppHeader() {
    const { data: session } = useSession();
    const router = useRouter();
    const { currentUser, setCurrentUser } = useUserContext() as IUserContext;

    if (session?.error === "RefreshAccessTokenError") {
        router.push("/auth/signin")
    }

    const fetchData = async () => {
        if (session?.access_token) {
            const resPayment = await sendRequest<IBackendRes<IPayment>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}payment/check/-1`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
                nextOption: {
                    next: { tags: ['payment'] }
                }
            });

            if (resPayment?.data) {
                setCurrentUser({
                    ...currentUser,
                    isPrenium: resPayment?.data?.status === 'PAID' ? true : false
                })
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [session])

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    function handleRedirectHome() {
        router.push("/")
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>
                <Link href={`/profile/${session?.user?._id ?? session?.user?.pk}`}
                    style={{
                        color: "unset",
                        textDecoration: "unset"
                    }}>
                    Profile
                </Link>
            </MenuItem>
            <MenuItem>
                <Link href={`/payment`}
                    style={{
                        color: "unset",
                        textDecoration: "unset"
                    }}>
                    Upgrade
                </Link>
            </MenuItem>
            <MenuItem onClick={
                () => {
                    handleMenuClose();
                    signOut({ callbackUrl: '/', redirect: true });
                    router.refresh()
                }
            }>Log out</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"
                sx={{ background: "#333333" }}>
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                cursor: "pointer"
                            }}
                            onClick={() => { handleRedirectHome() }}
                        >
                            SoundCloud
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onKeyDown={(e: any) => {
                                    if (e.key === "Enter") {
                                        if (e?.target?.value)
                                            router.push(`/search?q=${e?.target?.value}`)
                                    }
                                }}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <PersistentDrawerLeft />
                        <Box sx={{
                            display: { xs: 'none', sm: 'flex' },
                            alignItems: "center",
                            gap: "20px",
                            cursor: "pointer",
                            "> a": {
                                color: "unset",
                                textDecoration: "unset",
                                padding: "5px",

                                "&.active": { color: "orange" }
                            }
                        }}>
                            {
                                session
                                    ?
                                    <>{
                                        (session?.user?.isVerify || session?.user?.type !== 'CREDENTIAL' || currentUser?.isVerify) && (
                                            <>
                                                <ActiveLink href={"/playlist"}>PlayLists</ActiveLink>
                                                <ActiveLink href={"/likes"}>Likes</ActiveLink>
                                                <ActiveLink href={"/track/upload"}>Upload</ActiveLink>
                                                {session?.user?.type === 'CREDENTIAL' ?
                                                    <img
                                                        src={session?.user?.avatar !== "" && session?.user?.avatar !== null && session?.user?.avatar !== undefined ?
                                                            `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC}${session?.user?.avatar}` :
                                                            "/avatars-000184820148-9xr49w-t240x240.jpg"}
                                                        onClick={handleProfileMenuOpen}
                                                        style={{ width: 40, height: 40, borderRadius: "50%" }} />
                                                    :
                                                    <img
                                                        src={session?.user?.avatar !== "" && session?.user?.avatar !== null && session?.user?.avatar !== undefined ?
                                                            `${session?.user?.avatar}` :
                                                            "/avatars-000184820148-9xr49w-t240x240.jpg"}
                                                        onClick={handleProfileMenuOpen}
                                                        style={{ width: 40, height: 40, borderRadius: "50%" }} />
                                                }
                                                {currentUser?.isPrenium && <Tooltip title={'You are premium'} arrow>
                                                    <DiamondIcon sx={{ color: 'yellow' }} />
                                                </Tooltip>}
                                            </>
                                        )
                                    }
                                    </>
                                    :
                                    <Link href={"/auth/signin"}>Login</Link>
                            }

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMenu}
        </Box>
    );
}