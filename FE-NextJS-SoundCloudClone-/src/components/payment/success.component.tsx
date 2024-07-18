'use client'
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import Lottie from "lottie-react";
import successAnimation from '../../../public/success-animation.json';
import { useUserContext } from '@/lib/user.wrapper';

interface IProps {
    status: string;
}

const SuccessComponent = (props: IProps) => {
    const { currentUser, setCurrentUser } = useUserContext() as IUserContext;

    if (props?.status === 'PAID') {
        setCurrentUser({ ...currentUser, isPrenium: true });
    }

    return (
        <Container maxWidth="sm" sx={{ marginTop: 8 }}>
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <Lottie
                    autoplay
                    loop={true}
                    animationData={successAnimation}
                    style={{ height: '150px', width: '150px' }}
                />
                <Typography variant="h4" component="h1" gutterBottom>
                    Thanh toán thành công!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Cảm ơn bạn đã nâng cấp lên gói Premium. Bạn sẽ nhận được các lợi ích tương xứng ngay lập tức.
                </Typography>
                <Button variant="contained" color="primary" component={Link} href="/" sx={{ mt: 3 }}>
                    Quay lại trang chủ
                </Button>
            </Box>
        </Container>
    );
};

export default SuccessComponent;
