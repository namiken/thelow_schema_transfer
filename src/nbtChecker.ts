
import nbt from 'prismarine-nbt'
import { SchemaInfo } from './schemainfo'


export const readNbt = async (data: Buffer): Promise<SchemaInfo | "error"> => {
    try {
        const { parsed } = await nbt.parse(data)
        const schemaInfo = { world: {} } as SchemaInfo;
        schemaInfo.world.height = parsed.value.Height?.value.toString() ?? "不明";
        schemaInfo.world.width = parsed.value.Width?.value.toString() ?? "不明";
        schemaInfo.world.length = parsed.value.Length?.value.toString() ?? "不明";

        const tileEntities = (parsed.value.TileEntities?.value as Record<string, any>)["value"] as Record<string, any>[];
        const commandBlocks = tileEntities.filter(e => e.Command).map(e => ({ x: e.x.value, y: e.y.value, z: e.z.value, command: e.Command.value }))
        schemaInfo.commandBlocks = commandBlocks;

        const containers = tileEntities.filter(e => e.Items).map(e => ({
            x: e.x.value, y: e.y.value, z: e.z.value, type: e.id.value,
            items: e.Items.value.value.map((e: { id: { value: any; }; }) => e.id.value) ?? [] as string[],
        }))
        schemaInfo.containers = containers as any;


        console.log(schemaInfo);
        // console.log('JSON serialized', JSON.stringify(parsed, null, 2))
        return schemaInfo;
    } catch {
        return "error"
    }
}
