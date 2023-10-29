import { useState } from 'react';
import { Alert, Button, Container, Paper, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { readNbt } from './nbtChecker';
import { SchemaInfo, SchemaInfoDisplay } from './schemainfo';
import { UploadButtonArea } from './uploader';
const { Buffer } = require('buffer')

const UploadForm = () => {
    const [fileContent, setFileContent] = useState<{ schema: SchemaInfo, filename: string } | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setFileContent(null);
        setError(false);
        setProgress(0);

        const reader = new FileReader();
        reader.onload = async (event) => {
            const arrayBuffer = event.target?.result;
            const buffer = Buffer.from(new Uint8Array(arrayBuffer as ArrayBuffer));
            const schema = await readNbt(buffer);
            if (schema === "error") {
                setError(true);
                setProgress(0);
                return;
            }
            setFileContent({ schema, filename: file.name });
            setProgress(2);
        };
        reader.readAsArrayBuffer(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <Container maxWidth="lg">
            {error && (<Alert severity="error" sx={{ padding: '16px', margin: '16px' }} > アップロードされたスキーマファイルが不正です。</Alert>)}

            <Paper elevation={3} style={{ padding: '16px', margin: '16px', marginBottom: "3rem" }}>
                <Typography variant="h6" style={{ marginBottom: "2rem" }}>Step1. スキーマファイルを選択</Typography>
                <div {...getRootProps()} style={{ padding: '60px', border: '4px dashed #ccc', textAlign: 'center', margin: '16px' }}>
                    <input {...getInputProps()} />
                    <Typography>スキーマファイルをこちらにドラッグ&ドロップまたはクリックして選択</Typography>
                </div>
            </Paper>
            {
                (progress >= 1) && (
                    <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
                        <div style={{ marginTop: '16px' }}>
                            <Typography variant="h6" style={{ marginBottom: "2rem" }}>Step2. スキーマ情報確認</Typography>
                            <SchemaInfoDisplay schemaInfo={fileContent?.schema} filename={fileContent?.filename ?? ""} />
                        </div>
                    </Paper>
                )
            }
            {(progress >= 2) && (
                <UploadButtonArea></UploadButtonArea>
            )}
        </Container >
    );
};

export default UploadForm;