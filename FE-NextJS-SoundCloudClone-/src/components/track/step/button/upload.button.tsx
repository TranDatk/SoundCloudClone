import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { orange } from '@mui/material/colors';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileButton() {
    return (
        <Button
            onClick={(event) => { event.preventDefault(); }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{
                background: 'rgb(255, 85, 0)',
                '&:hover': {
                    background: 'rgb(255, 20, 0)',
                },
            }}
            startIcon={<CloudUploadIcon />}
        >
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}