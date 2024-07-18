// pages/policy.tsx

import Head from 'next/head';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const PolicyPage = () => {
    return (
        <>
            <Head>
                <title>Privacy Policy - SoundCloud Clone</title>
            </Head>
            <Container maxWidth="md">
                <Typography variant="h1" gutterBottom>
                    Privacy Policy
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to our Privacy Policy page! Here you can learn how we handle your data and ensure your privacy.
                </Typography>
                <Typography variant="h2" gutterBottom>
                    Information We Collect
                </Typography>
                <Typography variant="body1" gutterBottom>
                    We collect the following types of information:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Your name and email address when you register for an account." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Information about your usage of our services." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Any other information you choose to provide us." />
                    </ListItem>
                </List>

                <Typography variant="h2" gutterBottom>
                    How We Use Your Information
                </Typography>
                <Typography variant="body1" gutterBottom>
                    We use your information for the following purposes:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="To provide and maintain our services." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="To improve our services and develop new features." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="To communicate with you, including sending promotional materials." />
                    </ListItem>
                </List>

                <Typography variant="h2" gutterBottom>
                    Sharing Your Information
                </Typography>
                <Typography variant="body1" gutterBottom>
                    We may share your information with:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Service providers who assist us in providing our services." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Law enforcement agencies if required by law." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Other third parties with your consent." />
                    </ListItem>
                </List>

                <Typography variant="h2" gutterBottom>
                    Your Rights
                </Typography>
                <Typography variant="body1" gutterBottom>
                    You have the right to:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Access your personal information." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Request correction or deletion of your personal information." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Object to the processing of your personal information." />
                    </ListItem>
                </List>

                <Typography variant="body1" gutterBottom>
                    For more information about our Privacy Policy, please contact us at{' '}
                    <a href="mailto:hgooshvhd123@gmail.com">hgooshvhd123@gmail.com</a>.
                </Typography>
            </Container>
        </>
    );
};

export default PolicyPage;
