export type SchemaInfo = {
    world: { height: string, width: string, length: string }
    commandBlocks: { x: string, y: string, z: string, command: string }[],
    containers: { x: string, y: string, z: string, type: string, items: { id: string }[] }[],
}
import { Container, Paper, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';


export const SchemaInfoDisplay = (props: { schemaInfo: SchemaInfo | undefined, filename: string }) => {
    const schemaInfo = props.schemaInfo;
    if (!schemaInfo) {
        return (<>ファイルが存在しません</>);
    }
    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                スキーマ情報
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>ファイル名</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>高さ(Y)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>幅(X)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>幅(Z)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{props.filename}</TableCell>
                                <TableCell>{schemaInfo.world.height}</TableCell>
                                <TableCell>{schemaInfo.world.height}</TableCell>
                                <TableCell>{schemaInfo.world.width}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Typography variant="h5" gutterBottom sx={{ mt: "2rem" }}>
                コマンドブロック情報
            </Typography>
            {schemaInfo.commandBlocks.length ? (
                <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>X</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Y</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Z</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Command</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {schemaInfo.commandBlocks.map((block, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{block.x}</TableCell>
                                        <TableCell>{block.y}</TableCell>
                                        <TableCell>{block.z}</TableCell>
                                        <TableCell sx={{ overflow: 'auto', whiteSpace: 'nowrap', maxHeight: '100px' }}>
                                            {block.command}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : "コマンドブロックなし"}


            <Typography variant="h5" gutterBottom sx={{ mt: "2rem" }}>
                チェスト関連
            </Typography>
            {schemaInfo.containers.length ? (
                <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>X</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Y</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Z</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>ブロック</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>アイテム</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {schemaInfo.containers.map((container, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{container.x}</TableCell>
                                        <TableCell>{container.y}</TableCell>
                                        <TableCell>{container.z}</TableCell>
                                        <TableCell>{container.type}</TableCell>
                                        <TableCell>{container.items.toString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : "チェスト関連なし"}

        </Container>
    );
};
