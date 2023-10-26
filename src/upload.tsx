import { useState } from 'react';
import { Alert, Button, Container, Paper, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { readNbt } from './nbtChecker';
import { SchemaInfo, SchemaInfoDisplay } from './schemainfo';
const { Buffer } = require('buffer')

const UploadForm = () => {
    const [fileContent, setFileContent] = useState<{ schema: SchemaInfo, filename: string } | null>(null);
    const [error, setError] = useState<boolean>(false);

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setFileContent(null);
        setError(false);

        const reader = new FileReader();
        reader.onload = async (event) => {
            const arrayBuffer = event.target?.result;
            const buffer = Buffer.from(new Uint8Array(arrayBuffer as ArrayBuffer));
            const schema = await readNbt(buffer);
            if (schema === "error") {
                setError(true);
                return;
            }
            setFileContent({ schema, filename: file.name });
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
                fileContent && (
                    <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
                        <div style={{ marginTop: '16px' }}>
                            <Typography variant="h6" style={{ marginBottom: "2rem" }}>Step2. スキーマ情報確認 + アップロード</Typography>
                            {/* <Paper elevation={3} style={{ padding: '16px', maxHeight: '200px', overflow: 'auto' }}> */}
                            <SchemaInfoDisplay schemaInfo={fileContent.schema} filename={fileContent.filename} />
                            {/* </Paper> */}
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '16px' }}
                                onClick={() => {
                                    // ここに実行ボタンがクリックされたときの処理を追加
                                    console.log('実行ボタンがクリックされました');
                                }}
                            >
                                建築鯖へアップロード
                            </Button>
                        </div>
                    </Paper>
                )
            }
        </Container >
    );
};

export default UploadForm;