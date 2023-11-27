import { useState } from 'react';
import {
  Alert,
  Container,
  IconButton,
  LinearProgress,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { readNbt } from './nbtChecker';
import { SchemaInfo, SchemaInfoDisplay } from './schemainfo';
import { UploadButtonArea } from './uploader';
import axios from 'axios';
import { useMutation } from 'react-query';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CustomSnackbar } from './CustomSnackbar';

const { Buffer } = require('buffer');
import https from 'https';

//オレオレ証明書を使っているため、証明書の検証をスキップする
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const UploadForm = () => {
  const [fileContent, setFileContent] = useState<{
    base64: string;
    schema: SchemaInfo;
    filename: string;
  } | null>(null);
  const [snackbarText, setSnackbarText] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const mutation = useMutation(async (mcid: string) => {
    const postUrl =
      'https://mc.eximradar.jp:13004/schema/' + fileContent?.filename;

    // POSTリクエストを実行
    const response = await instance.post(postUrl, {
      schema: fileContent?.base64,
      mcid,
    });

    console.log('===CONNET SERVER===');
    setProgress(3);
    setSnackbarText('正常に送信が完了しました。');

    // レスポンスを返す
    return response.data ?? 'OK';
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFileContent(null);
    setError(false);
    setProgress(0);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result;
      const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);
      const base64 = btoa(
        uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      const buffer = Buffer.from(uint8Array);
      const schema = await readNbt(buffer);
      if (schema === 'error') {
        setError(true);
        setProgress(2);
        return;
      }
      setFileContent({ base64, schema, filename: file.name });
      setProgress(2);
      setSnackbarText('schemaを読み込みました。');
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container maxWidth="lg">
      {error && (
        <Alert severity="error" sx={{ padding: '16px', margin: '16px' }}>
          {' '}
          アップロードされたスキーマファイルが不正です。
        </Alert>
      )}

      <Paper
        elevation={3}
        style={{ padding: '16px', margin: '16px', marginBottom: '3rem' }}
      >
        <Typography variant="h6" style={{ marginBottom: '2rem' }}>
          Step1. スキーマファイルを選択
        </Typography>
        <div
          {...getRootProps()}
          style={{
            padding: '60px',
            border: '4px dashed #ccc',
            textAlign: 'center',
            margin: '16px',
          }}
        >
          <input {...getInputProps()} />
          <Typography>
            スキーマファイルをこちらにドラッグ&ドロップまたはクリックして選択
          </Typography>
        </div>
      </Paper>
      {progress >= 1 && (
        <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
          <div style={{ marginTop: '16px' }}>
            <Typography variant="h6" style={{ marginBottom: '2rem' }}>
              Step2. スキーマ情報確認
            </Typography>
            <SchemaInfoDisplay
              schemaInfo={fileContent?.schema}
              filename={fileContent?.filename ?? ''}
            />
          </div>
        </Paper>
      )}
      {progress >= 2 && (
        <div>
          <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
            <UploadButtonArea
              handleClick={(mcid: string) => {
                mutation.mutate(mcid);
              }}
              isDisabled={progress !== 2}
            ></UploadButtonArea>
            <Alert
              severity="error"
              sx={{
                padding: '16px',
                margin: '16px',
                display: mutation.isError ? 'flex' : 'none',
              }}
            >
              {' '}
              送信に失敗しました。
            </Alert>
            <LinearProgress
              sx={{
                padding: '2px',
                margin: '20px 20%',
                display: mutation.isLoading ? 'flex' : 'none',
              }}
            />
          </Paper>
        </div>
      )}
      {progress >= 3 && (
        <div>
          <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
            <div style={{ marginTop: '16px' }}>
              <Typography variant="h6" style={{ marginBottom: '2rem' }}>
                Step4. 建築鯖へ移植
              </Typography>
              建築鯖で以下のコマンドを実行してください。
              <Paper
                elevation={8}
                style={{
                  padding: '16px',
                  margin: '16px auto',
                  width: 'fit-content',
                  textAlign: 'center',
                }}
              >
                <Typography style={{ fontWeight: 'bold' }}>
                  /schema_copy {fileContent?.filename ?? '不明なファイル'}
                  <IconButton
                    color="primary"
                    size="small"
                    sx={{ marginLeft: '1rem' }}
                    onClick={async () => {
                      await global.navigator.clipboard.writeText(
                        `/schema_copy ${
                          fileContent?.filename ?? '不明なファイル'
                        }`
                      );
                      setSnackbarText('クリップボードにコピーしました');
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                    コピーする
                  </IconButton>
                </Typography>
              </Paper>
            </div>
          </Paper>
        </div>
      )}

      <CustomSnackbar
        snackbarText={snackbarText}
        setSnackbarText={setSnackbarText}
      />
    </Container>
  );
};

export default UploadForm;
