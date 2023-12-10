'use server'
import { ScrapItem } from "@/src/entities/ScrapItem";
import { User } from "@/src/entities/User";
import { getSharedDataSource } from "@/src/shared_database_connection";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export interface ScrapDto {
    id: string
    description: string
    latitude: number
    longitude: number
}

const mapEntityToDto = (entity: ScrapItem): ScrapDto => {
    const {
        id,
        description,
        latitude,
        longitude
    } = entity;

    return {
        id,
        description,
        latitude,
        longitude
    }
}

const parseFloatOrThrow = (input: string): number => {
    const result = parseFloat(input);

    if (Number.isNaN(result)) {
        throw new Error(`Invalid number: ${input}`);
    }
    return result;
}

export const getScrap = async (scrapId: string) => {
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

    if (!description || typeof description !== 'string' ||
    !coordinate || typeof coordinate !== 'string') {
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