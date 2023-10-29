import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const UploadButtonArea = (props: { handleClick: any }) => {
    const [mcid, setMcid] = useState<string | null>(null);

    return (
        <div style={{ marginTop: '16px' }}>
            <Typography variant="h6" style={{ marginBottom: "2rem" }}>Step3. アップロード</Typography>
            <TextField id="standard-basic" label="MCID" variant="standard" helperText="画面を操作している人のMCIDをいれてください" sx={{ marginRight: "2rem" }} onChange={e => {
                setMcid(e.target.value);
            }} />
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '16px' }}
                disabled={!mcid}
                onClick={() => {
                    props.handleClick(mcid);
                }}
            >
                建築鯖へアップロード
            </Button>
        </div>
    );
}
