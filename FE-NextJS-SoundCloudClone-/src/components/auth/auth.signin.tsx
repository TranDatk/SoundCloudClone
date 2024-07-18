'use client'
import { Alert, Avatar, Box, Button, Divider, Grid, Snackbar, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/next-auth";
import { sendRequest } from "@/utils/api";
import { useUserContext } from "@/lib/user.wrapper";



const AuthSignIn = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
    const [isErrorRePassword, setIsErrorRePassword] = useState<boolean>(false);

    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [errorRePassword, setErrorRePassword] = useState<string>("");

    const [openMessage, setOpenMessage] = useState<boolean>(false);
    const [resMessage, setResMessage] = useState<string>("");

    const [openSuccessMessage, setOpenSuccessMessage] = useState<boolean>(false);
    const [resSuccessMessage, setResSuccessMessage] = useState<string>("");

    const [isRegister, setIsRegister] = useState<boolean>(false);
    const { currentUser, setCurrentUser } = useUserContext() as IUserContext;

    const handleVerify = async () => {
        const resVerify = await sendRequest<IBackendRes<IVerify>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/verify`,
            method: "POST",
            body: { email: `${username}` }
        });
        return resVerify?.data?.isVerify ?? false;
    };

    const handleSubmit = async () => {
        setIsErrorUsername(false);
        setIsErrorPassword(false);
        setErrorUsername("");
        setErrorPassword("");

        if (!username) {
            setIsErrorUsername(true);
            setErrorUsername("Username is not empty.")
            return;
        }
        if (!password) {
            setIsErrorPassword(true);
            setErrorPassword("Password is not empty.")
            return;
        }

        const res = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false
        });
        if (!res?.error) {
            const verified = await handleVerify();
            if (verified) {
                router.push("/");
                setCurrentUser({ ...currentUser, isVerify: true });
            } else {
                setCurrentUser({ ...currentUser, isVerify: false });
                router.push(`/verify?email=${username}`);
            }
        } else {
            setOpenMessage(true);
            setResMessage("Mật khẩu hoặc tài khoản không chính xác");
        }
    }

    const handleRegister = async () => {
        setIsErrorUsername(false);
        setIsErrorPassword(false);
        setErrorUsername("");
        setErrorPassword("");

        if (!username) {
            setIsErrorUsername(true);
            setErrorUsername("Email is not empty.")
            return;
        }
        if (!password) {
            setIsErrorPassword(true);
            setErrorPassword("Password is not empty.")
            return;
        }
        if (!rePassword) {
            setIsErrorRePassword(true);
            setErrorRePassword("Confirm password is not empty.")
            return;
        }
        if (rePassword !== password) {
            setIsErrorRePassword(true);
            setErrorRePassword("The confirm passwords you entered don't align")
            return;
        }

        const res = await sendRequest<IBackendRes<IUser>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register`,
            method: "POST",
            body: {
                email: username,
                password: password,
                rePassword: rePassword
            }
        });
        if (res?.data) {
            setIsRegister(false);
            setOpenSuccessMessage(true);
            setResSuccessMessage("Account successfully created");
            setUsername(username);
            setPassword(password);
            handleSubmit();
        } else {
            setOpenMessage(true);
            setResMessage('Đăng ký thất bại');
        }
    }

    return (
        <Box
            sx={{
                backgroundImage: "linear-gradient(to bottom, #FFFACD, #fedac1, #d5e1cf, #b7e6d9)",
                backgroundColor: "white",
                backgroundRepeat: "no-repeat"
            }}
        >
            {!isRegister && <Grid container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh"
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    lg={4}
                    sx={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }}
                >
                    <div style={{ margin: "20px" }}>
                        <Link href="/">
                            <ArrowBackIcon />
                        </Link>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%"
                        }}>

                            <Avatar>
                                <LockIcon />
                            </Avatar>

                            <Typography component="h1">
                                Sign in
                            </Typography>
                        </Box>

                        <TextField
                            onChange={
                                (event) => {
                                    setUsername(event.target.value);
                                    if (!event.target.validity.valid) {
                                        setIsErrorUsername(true);
                                        setErrorUsername('Please enter a valid email');
                                    } else {
                                        setErrorUsername('');
                                        setIsErrorUsername(false);
                                    }
                                }
                            }
                            variant="outlined"
                            margin="normal"
                            required
                            inputProps={{
                                type: "email",
                            }}
                            fullWidth
                            label="Email"
                            name="username"
                            autoFocus
                            error={isErrorUsername}
                            helperText={errorUsername}

                        />
                        <TextField
                            onChange={(event) => setPassword(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            error={isErrorPassword}
                            helperText={errorPassword}
                            onKeyDown={(e) => { e.key === "Enter" && handleSubmit() }}

                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                        <Button
                            sx={{
                                mt: 3,
                                mb: 2
                            }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Button
                            sx={{
                                mb: 3,
                                backgroundColor: '#42b72a',
                                color: 'white'
                            }}
                            variant="text"
                            fullWidth
                            color="primary"
                            onClick={() => { setIsRegister(true) }}
                        >
                            Create new account
                        </Button>
                        <Divider>Or using</Divider>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "25px",
                                mt: 3
                            }}
                        >
                            <Avatar
                                sx={{
                                    cursor: "pointer",
                                    bgcolor: "orange"
                                }}
                                onClick={() => { signIn("github") }}
                            >
                                <GitHubIcon titleAccess="Login with Github" />
                            </Avatar>

                            <Avatar
                                sx={{
                                    cursor: "pointer",
                                    bgcolor: "orange"
                                }}
                                onClick={() => { signIn("google") }}
                            >
                                < GoogleIcon titleAccess="Login with Google" />
                            </Avatar>
                        </Box>
                    </div>
                </Grid>
            </Grid>
            }
            {isRegister && <Grid container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh"
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    lg={4}
                    sx={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }}
                >
                    <div style={{ margin: "20px" }}>
                        <Link
                            href='#'
                            onClick={() => { setIsRegister(false) }}
                            style={{ 'textDecoration': 'none', color: 'inherit', }}
                        >
                            <ArrowBackIcon />
                        </Link>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%"
                        }}>

                            <Avatar>
                                <LockIcon />
                            </Avatar>

                            <Typography component="h1">
                                Sign in
                            </Typography>
                        </Box>

                        <TextField
                            onChange={
                                (event) => {
                                    setUsername(event.target.value);
                                    if (!event.target.validity.valid) {
                                        setIsErrorUsername(true);
                                        setErrorUsername('Please enter a valid email');
                                    } else {
                                        setErrorUsername('');
                                        setIsErrorUsername(false);
                                    }
                                }
                            }
                            variant="outlined"
                            margin="normal"
                            required
                            inputProps={{
                                type: "email",
                            }}
                            fullWidth
                            label="Email"
                            name="username"
                            autoFocus
                            error={isErrorUsername}
                            helperText={errorUsername}
                        />
                        <TextField
                            onChange={(event) => setPassword(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            error={isErrorPassword}
                            helperText={errorPassword}
                            onKeyDown={(e) => { e.key === "Enter" && handleSubmit() }}

                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                        <TextField
                            onChange={(event) => setRePassword(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="rePassword"
                            label="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            error={isErrorRePassword}
                            helperText={errorRePassword}
                            onKeyDown={(e) => { e.key === "Enter" && handleRegister() }}

                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                        <Button
                            sx={{
                                mt: 3,
                                mb: 2
                            }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleRegister}
                        >
                            Submit
                        </Button>
                    </div>
                </Grid>
            </Grid>
            }
            <Snackbar
                open={openMessage}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert
                    onClose={() => { setOpenMessage(false) }}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {resMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSuccessMessage}
                autoHideDuration={3000}
                onClose={() => { setOpenSuccessMessage(false) }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert
                    onClose={() => { setOpenSuccessMessage(false) }}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {resSuccessMessage}
                </Alert>
            </Snackbar>
        </Box>

    )
}

export default AuthSignIn;
