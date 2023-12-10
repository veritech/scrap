import { config } from "@/src/database_configuration";
import { ScrapItem } from "../../../entities/ScrapItem";
import { DataSource, Repository } from "typeorm";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const dataSource = new DataSource(config);

    await dataSource.initialize();

    const scrapRepo = await dataSource.getRepository(ScrapItem);

    const items = await scrapRepo.find({
        take: 50,
        skip: 0
    });

    return Response.json({ success: true, items });
}