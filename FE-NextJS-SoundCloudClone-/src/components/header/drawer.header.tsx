'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BackupIcon from '@mui/icons-material/Backup';
import ActiveLink from './active.link';
import { useUserContext } from '@/lib/user.wrapper';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react"
import DiamondIcon from '@mui/icons-material/Diamond';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { currentUser, setCurrentUser } = useUserContext() as IUserContext;
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const router = useRouter();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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
        <>
            {
                session ? (
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        {
                            (session?.user?.isVerify || session?.user?.type !== 'CREDENTIAL' || currentUser?.isVerify) && (
                                <>
                                    <Toolbar sx={{ display: `${open ? 'none' : ''}` }}>
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={handleDrawerOpen}
                                            edge="start"
                                            sx={{ ml: 'auto', ...(open && { display: 'none' }) }}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    </Toolbar>
                                    <Drawer
                                        sx={{
                                            width: open ? drawerWidth : 0,
                                            flexShrink: 0,
                                            '& .MuiDrawer-paper': {
                                                width: drawerWidth,
                                                boxSizing: 'border-box',
                                            },
                                        }}
                                        variant="persistent"
                                        anchor="right"
                                        open={open}
                                    >
                                        <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <IconButton onClick={handleDrawerClose}>
                                                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                            </IconButton>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: ' 10px' }}>
                                                <Typography>Hello {session?.user?.name ?? ''}</Typography>
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
                                            </Box>
                                        </DrawerHeader>
                                        <Divider />
                                        <List sx={{
                                            alignItems: "center",
                                            "a": {
                                                color: "unset",
                                                textDecoration: "unset",
                                                padding: "5px",

                                                "&.active": { color: "orange" }
                                            }
                                        }}>
                                            <ListItem key='playlist' disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <QueueMusicIcon />
                                                    </ListItemIcon>
                                                    <ActiveLink href={"/playlist"}>PlayLists</ActiveLink>
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem key='likes' disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <FavoriteBorderIcon />
                                                    </ListItemIcon>
                                                    <ActiveLink href={"/likes"}>Likes</ActiveLink>
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem key='upload' disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <BackupIcon />
                                                    </ListItemIcon>
                                                    <ActiveLink href={"/track/upload"}>Upload</ActiveLink>
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem key='prenium' disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <DiamondIcon />
                                                    </ListItemIcon>
                                                    <ActiveLink href={"/payment"}>Prenium</ActiveLink>
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    </Drawer>
                                </>
                            )
                        }
                    </Box>
                )
                    :
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        <Link style={{
                            color: "unset",
                            textDecoration: "unset",
                            padding: "5px",
                        }} href={"/auth/signin"}>Login</Link>
                    </Box>
            }
            {renderMenu}
        </>
    );
}

