'use server'
import { cookies } from "next/headers";

export const addScrap = async (formData: FormData) => {

    cookies().set('user_id', 'foo');

    console.log(formData);
}

export const autocompletLocation = (formData: FormData) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}6&lon=${lon}`
}

export const lookupPostcode = async (input: string) => {
    console.log('postcode', input);
    // const url = `api.postcodes.io/postcodes/${postcode}`;

    // const response = await fetch(url)
    //     .then(r => r.json());

    // const { longitude, latitude } = response;

    // return Promise.resolve({ longitude, latitude });
}