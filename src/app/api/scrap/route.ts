import { ScrapItem } from "../../../entities/ScrapItem";
import { getSharedDataSource } from "@/src/shared_database_connection";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const dataSource = await getSharedDataSource()
    const scrapRepo = await dataSource.getRepository(ScrapItem);

    const items = await scrapRepo.find({
        take: 50,
        skip: 0
    });

    return Response.json({ success: true, items });
}