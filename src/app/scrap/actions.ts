'use server'
import { ScrapItem } from "@/src/entities/ScrapItem";
import { User } from "@/src/entities/User";
import { getSharedDataSource } from "@/src/shared_database_connection";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { DateTime } from "luxon";

export interface ScrapDto {
    id: string
    description: string
    latitude: number
    longitude: number
    address: string
    createdTime: string | null
}

const mapEntityToDto = (entity: ScrapItem): ScrapDto => {
    const {
        id,
        description,
        latitude,
        longitude,
        address,
        createdTime
    } = entity;
    return {
        id,
        description,
        address,
        latitude,
        longitude,
        createdTime: DateTime.fromJSDate(createdTime).toISO()
    }
}

const parseFloatOrThrow = (input: string): number => {
    const result = parseFloat(input);

    if (Number.isNaN(result)) {
        throw new Error(`Invalid number: ${input}`);
    }
    return result;
}

export const getScrap = async (take: number = 20, skip: number = 0): Promise<ScrapDto[]> => {
    const dataSource = await getSharedDataSource()
    const scrapItemRepo = dataSource.getRepository(ScrapItem);
    
    return scrapItemRepo.find({
        take,
        skip,
        order: {
            createdTime: 'DESC'
        }
    }).then(r => r.map(mapEntityToDto))
}

export const getScrapById = async (scrapId: string): Promise<ScrapDto> => {
    const dataSource = await getSharedDataSource()
    const scrapItemRepo = dataSource.getRepository(ScrapItem);

    return scrapItemRepo.findOneByOrFail({
        id: scrapId
    }).then(mapEntityToDto);
}

export const addScrap = async (formData: FormData) => {
    const dataSource = await getSharedDataSource()

    const scrapItemRepo = dataSource.getRepository(ScrapItem);
    const userRepo = dataSource.getRepository(User);

    const cookieStore = cookies();

    const cookie = cookieStore.get('user_id');
    if (!cookie || !cookie.value) {
        throw new Error('User is not logged in');
    }

    const description = formData.get("description");
    const coordinate = formData.get("coordinate");
    const address = formData.get("address");

    if (!description || typeof description !== 'string' ||
    !coordinate || typeof coordinate !== 'string' ||
    !address || typeof address !== 'string') {
        console.log('data', {
            coordinate,
            description,
            address,
        })
        throw new Error('Invalid input');
    }

    const [lat, lng] = coordinate.split(',');

    const user = await userRepo.findOneByOrFail({
        id: cookie.value
    });

    const newScrap = await scrapItemRepo.save({
        latitude: parseFloatOrThrow(lat),
        longitude: parseFloatOrThrow(lng),
        description,
        address,
        user
    })

    redirect(`/scrap/${newScrap.id}`);
}

interface PostcodeLookupResponse { 
    longitude: number,
    latitude: number
}

export const performPostcodeLookup = async (input: string): Promise<PostcodeLookupResponse> => {
    console.log('postcode', input);
    const url = `https://api.postcodes.io/postcodes/${input}`;

    const response = await fetch(url, {
        cache: 'force-cache'
    })
        .then(r => r.json());

    if (response.result) {
        const { result: { longitude, latitude } } = response;
    
        console.log(response);
    
        return Promise.resolve({ longitude, latitude });
    }

    return Promise.reject(new Error("Unable to find response"));
}
