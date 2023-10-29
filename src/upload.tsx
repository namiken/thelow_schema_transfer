import { useState } from 'react';
import { Alert, Container, LinearProgress, Paper, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { readNbt } from './nbtChecker';
import { SchemaInfo, SchemaInfoDisplay } from './schemainfo';
import { UploadButtonArea } from './uploader';
import axios from 'axios';
import { useMutation } from 'react-query';
import { UploadRequest } from './uploadRequest';
const { Buffer } = require('buffer')

const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

const UploadForm = () => {
    const [fileContent, setFileContent] = useState<{ schema: SchemaInfo, filename: string } | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [request, setRequest] = useState<UploadRequest>({} as UploadRequest);
    const mutation = useMutation(async () => {
        await sleep(2000);
        setProgress(3);
    });

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
                setProgress(2);
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
            {
                (progress >= 2) && (
                    <div>
                        <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
                            <UploadButtonArea handleClick={(mcid: string) => {
                                setRequest({ ...request, mcid });
                                mutation.mutate();
                            }}></UploadButtonArea>
                            <Alert severity="success" sx={{ padding: '16px', margin: '16px', display: mutation.isError ? "flex" : "none" }}  > 正常に送信が完了しました。</Alert>
                            <Alert severity="error" sx={{ padding: '16px', margin: '16px', display: mutation.isError ? "flex" : "none" }} > 送信に失敗しました。</Alert>
                            <LinearProgress sx={{ padding: '2px', margin: '20px 20%', display: mutation.isLoading ? "flex" : "none" }} />
                        </Paper>
                    </div>
                )
            }
            {
                (progress >= 3) &&
                (
                    <div>
                        <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
                            <div style={{ marginTop: '16px' }}>
                                <Typography variant="h6" style={{ marginBottom: "2rem" }}>Step4. 建築鯖へ移植</Typography>
                                建築鯖で以下のコマンドを実行してください。
                                <Typography style={{ fontWeight: 'bold' }}>/schema_copy {fileContent?.filename ?? "不明なファイル"}</Typography>
                            </div>
                        </Paper>
                    </div>
                )

            }
        </Container >
    );
};

export default UploadForm;