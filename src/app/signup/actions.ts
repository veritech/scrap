'use server'
import { cookies } from "next/headers";

export const validateAndSignin = async (formData: FormData) => {
    cookies().set('user_id', 'foo');
}