'use client'

import { FileWithPath, useDropzone } from 'react-dropzone'
import './dropzone.scss'
import InputFileButton from './button/upload.button';
import { useCallback, useState } from 'react';
import { sendRequest } from '@/utils/api';
import { useSession } from 'next-auth/react';
import axios, { AxiosProgressEvent } from 'axios';
import { useToast } from '@/utils/toast';

interface IProps {
    setValue: (v: number) => void;
    setTrackUpload: React.Dispatch<React.SetStateAction<{
        fileName: string;
        percent: number;
        url: string;
    }>>;
    trackUpload: {
        fileName: string;
        percent: number;
        url: string;
    }
}

const Step1 = (props: IProps) => {
    const toast = useToast();
    const { data: session } = useSession();
    const { trackUpload } = props;
    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            const audio = acceptedFiles[0];
            if (audio.type.startsWith('audio/')) {
                props.setValue(1);
                const formData = new FormData();
                formData.append('file', audio);

                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}files/upload`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${session?.access_token}`,
                        },
                        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total!);
                            props.setTrackUpload({
                                ...trackUpload,
                                fileName: audio.name,
                                percent: percentCompleted,
                            });
                        }
                    });
                    if (res?.data) {
                        props.setTrackUpload((prevState: any) => ({
                            ...prevState,
                            url: res?.data?.data?.fileName
                        }));
                    } else {
                        toast.error("Lỗi khi tải âm thanh")
                    }
                } catch (error) {
                    //@ts-ignore
                    const errorString = error?.response?.data.message
                    toast.error(errorString ?? "Lỗi khi tải âm thanh")
                }
            } else {
                toast.error("Vui lòng chọn một tệp âm thanh.")
            }
        }
    }, [session]);


    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/*': ['.mp3', '.wav', '.ogg', '.flac', '.aiff']
        }
    });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <InputFileButton />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    )
}

export default Step1;