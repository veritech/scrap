import { config } from "@/src/database_configuration";
import { DataSource } from "typeorm";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const dataSource = new DataSource(config);

    return Response.json({ success: true });
}