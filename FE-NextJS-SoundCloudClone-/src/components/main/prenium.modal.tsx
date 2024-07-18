'use client'

import { Fade, Modal, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/navigation";
import { useUserContext } from "@/lib/user.wrapper";

const PremiumModal = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { currentUser, setCurrentUser } = useUserContext() as IUserContext;

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setOpen(false);
        setCurrentUser({ ...currentUser, haveUserAccessed: true });
    };

    return (
        <>
            {!currentUser?.haveUserAccessed &&
                < Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                    }
                >
                    <Fade in={open} timeout={500}>
                        <Box
                            sx={{
                                position: 'relative',
                                width: { xs: '18rem', sm: '30rem' },
                                height: { xs: '18rem', sm: '30rem' },
                            }}
                        >
                            <img
                                src='/modal.png'
                                alt="Modal Content"
                                style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }}
                                onClick={() => { router.push('/payment') }}
                            />
                            <Button
                                variant="text"
                                color="error"
                                sx={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '8px',
                                    color: 'white',
                                    width: { xs: '1vw', sm: '25px' },
                                    height: { xs: '1rem', sm: '2rem' },
                                }}
                                onClick={handleClose}
                            >
                                <CloseIcon sx={{ fontSize: '2rem' }} />
                            </Button>
                        </Box>
                    </Fade>
                </ Modal>
            }
        </>
    );

};

export default PremiumModal;
