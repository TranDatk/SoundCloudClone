'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Tabs, Typography } from '@mui/material';
import Step1 from './step/step1';
import Step2 from './step/step2';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface IProps {
    genres: IGenre[]
}

const UploadTabs = (props: IProps) => {
    const { genres } = props;
    const [value, setValue] = React.useState(0);
    const [trackUpload, setTrackUpload] = React.useState({
        fileName: "",
        percent: 0,
        url: ''
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt: '50px', border: '0.5px solid #ccc' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        disabled={value !== 0}
                        label="Tracks"
                        {...a11yProps(0)}
                    />
                    <Tab
                        disabled={value !== 1}
                        label="Basic information"
                        {...a11yProps(1)}
                    />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Step1
                    setValue={setValue}
                    trackUpload={trackUpload}
                    setTrackUpload={setTrackUpload}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Step2
                    setValue={setValue}
                    trackUpload={trackUpload}
                    genres={genres}
                />
            </CustomTabPanel>
        </Box>
    );
}

export default UploadTabs;