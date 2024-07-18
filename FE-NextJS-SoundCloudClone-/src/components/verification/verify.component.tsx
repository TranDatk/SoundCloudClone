'use client'
import { createRef, useEffect, useRef, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Link } from '@mui/material';
import { useRouter } from "next/navigation";
import { useUserContext } from '@/lib/user.wrapper';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/toast';

const VerifyCodeComponent = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const router = useRouter();
    const { currentUser, setCurrentUser } = useUserContext() as IUserContext;
    const inputRefs = useRef([...Array(6)].map(() => createRef<HTMLInputElement>()));
    const [timeLeft, setTimeLeft] = useState(300);
    const { data: session } = useSession();
    const [resendTimer, setResendTimer] = useState(0);
    const toast = useToast();

    useEffect(() => {
        if (!session?.user) {
            router.push('/');
        }
    }, [])

    useEffect(() => {
        inputRefs.current[0]?.current?.focus();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };


    const handleCodeChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement> & { nativeEvent: InputEvent }) => {
        const value = event.target.value;
        const newCode = [...code];

        if (value === '') {
            newCode[index] = '';
            setCode(newCode);

            if (index > 0) {
                inputRefs.current[index - 1]?.current?.focus();
            }
        } else if (/^\d$/.test(value)) {
            newCode[index] = value;
            setCode(newCode);

            if (index < 5) {
                inputRefs.current[index + 1]?.current?.focus();
            }
        }
    };

    const handleKeyDown = (index: number) => (event: React.KeyboardEvent) => {
        if (event.key === 'Backspace' && code[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.current?.focus();
        }
    };


    const handleSubmit = async () => {
        const codeValue = code.join('');
        const resVerify = await sendRequest<IBackendRes<IVerify>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/verify/code`,
            method: "POST",
            body: { code: codeValue },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        });
        if (resVerify?.data?.isVerify) {
            setCurrentUser({ ...currentUser, isVerify: resVerify?.data?.isVerify })
            router.push('/');
        } else {
            toast.error(resVerify?.data?.message ?? 'Verify failed');
        }
    };

    const handleResendCode = async () => {
        setResendTimer(60);
        setTimeLeft(300);
        const resVerify = await sendRequest<IBackendRes<IVerify>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/resend`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        });
        if (!resVerify?.error) {
            toast.success('Gửi lại mã xác minh thành công');
            setTimeLeft(300);
        } else {
            toast.error('Gửi lại mã xác minh thất bại');
        }

    };

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => {
                setResendTimer(resendTimer - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    return (
        <Container maxWidth="sm" sx={{ marginTop: 8 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    Xác minh mã
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Mã xác minh đã được gửi tới email: {session?.user?.email}. Vui lòng nhập mã trong vòng 5 phút.
                </Typography>
                <Typography variant="h6" color="error">
                    Thời gian còn lại: {formatTime(timeLeft)}
                </Typography>
                <Box style={{ width: '100%' }}>
                    <Box display="flex" justifyContent="space-between" my={2}>
                        {code.map((digit, index) => (
                            <TextField
                                key={index}
                                value={digit}
                                onChange={handleCodeChange(index)}
                                onKeyDown={handleKeyDown(index)}
                                inputRef={inputRefs.current[index]}
                                inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                                variant="outlined"
                                sx={{ width: 48 }}
                                required
                            />
                        ))}
                    </Box>
                    <Button onClick={() => { handleSubmit() }} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Xác minh
                    </Button>
                </Box>
                <Box mt={2}>
                    {resendTimer > 0 ? (
                        <Typography variant="body2" color="textSecondary">
                            Bạn có thể gửi lại mã sau: {resendTimer} giây
                        </Typography>
                    ) : (
                        <Link href="#" onClick={handleResendCode}>
                            Bạn không nhận được mã? Nhấn vào đây để gửi lại mã
                        </Link>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default VerifyCodeComponent;
