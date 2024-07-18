'use client'
import { sendRequest } from "@/utils/api";
import { Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Metadata } from "next"
import { useSession } from "next-auth/react";
import { useUserContext } from "@/lib/user.wrapper";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useToast } from '@/utils/toast';

const PaymentComponent = () => {
    const { data: session } = useSession();
    const { currentUser, setCurrentUser } = useUserContext() as IUserContext;
    const { push } = useRouter();
    const toast = useToast();

    const handleUpgrade = async () => {
        const res = await sendRequest<IBackendRes<ICreatePaymentResponse>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}payment/create`,
            method: "POST",
            body: {
                "amount": 2000,
                "description": `${session?.user?.email}`,
                "buyerName": `${session?.user?.name}`,
                "buyerEmail": `${session?.user?.email}`,
                "cancelUrl": `${process.env.NEXT_PUBLIC_FRONTEND_PUBLIC}payment/cancel`,
                "returnUrl": `${process.env.NEXT_PUBLIC_FRONTEND_PUBLIC}payment/success`,
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        });
        if (res?.data) {
            push(res?.data?.checkoutUrl);
        } else {
            toast.error("Lỗi khi thực hiện chuyển trang, hãy liên lạc với người quản trị")
        }
    }

    return (
        <Container maxWidth="md" sx={{ marginTop: 8 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    Nâng cấp lên hạng Premium
                </Typography>
                <Grid container spacing={4} sx={{ marginTop: 4 }}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ minHeight: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Gói Free
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Miễn phí
                                </Typography>
                                <Typography variant="body2">
                                    Với gói Free, bạn sẽ nhận được:
                                </Typography>
                                <Box component="ul" sx={{ mt: 2 }}>
                                    <Typography component="li" variant="body2">Nghe nhạc với giới hạn</Typography>
                                    <Typography component="li" variant="body2">Có quảng cáo</Typography>
                                    <Typography component="li" variant="body2">Chất lượng âm thanh tiêu chuẩn</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ minHeight: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Gói Premium
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    2000 VND / tháng
                                </Typography>
                                <Typography variant="body2">
                                    Với gói Premium, bạn sẽ nhận được các lợi ích sau:
                                </Typography>
                                <Box component="ul" sx={{ mt: 2 }}>
                                    <Typography component="li" variant="body2">Nghe nhạc không giới hạn</Typography>
                                    <Typography component="li" variant="body2">Tải nhạc về thiết bị</Typography>
                                    <Typography component="li" variant="body2">Không có quảng cáo</Typography>
                                    <Typography component="li" variant="body2">Chất lượng âm thanh cao</Typography>
                                </Box>
                                {
                                    !currentUser?.isPrenium ?
                                        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => { handleUpgrade() }}>
                                            Thực hiện thanh toán
                                        </Button>
                                        :
                                        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                                            Bạn đang là hạng Prenium
                                        </Button>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container >
    );
}

export default PaymentComponent;