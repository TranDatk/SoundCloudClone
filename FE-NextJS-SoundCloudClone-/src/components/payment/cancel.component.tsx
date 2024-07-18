'use client'
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import Lottie from "lottie-react";
import successAnimation from '../../../public/cancel-animation.json';

const CancelComponent = () => {
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
                    Thanh toán bị hủy bỏ
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Giao dịch của bạn đã bị hủy bỏ. Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua địa chỉ email: hgooshvhd123@gmail.com.
                </Typography>
                <Button variant="contained" color="primary" component={Link} href="/payment" sx={{ mt: 3 }}>
                    Thử lại
                </Button>
            </Box>
        </Container>
    );
};

export default CancelComponent;
