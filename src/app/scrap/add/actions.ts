'use server'
import { ScrapItem } from "@/src/entities/ScrapItem";
import { User } from "@/src/entities/User";
import { getSharedDataSource } from "@/src/shared_database_connection";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export const addScrap = async (formData: FormData) => {
    const dataSource = await getSharedDataSource()

    const scrapItemRepo = dataSource.getRepository(ScrapItem);
    const userRepo = dataSource.getRepository(User);

    const cookieStore = cookies();

    const userId = cookieStore.get('user_id');

    if (!userId || typeof userId !== 'string') {
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
        id: userId
    });

    const newScrap = await scrapItemRepo.save({
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        description,
        user
    })

    redirect(`/scrap/${newScrap.id}`);
}

export const performPostcodeLookup = async (input: string) => {
    console.log('postcode', input);
    const url = `api.postcodes.io/postcodes/${input}`;

    const response = await fetch(url, {
        cache: 'force-cache'
    })
        .then(r => r.json());

        console.log('response', response);
    // const { longitude, latitude } = response;

    return Promise.resolve({ longitude: 0, latitude: -52 });
}