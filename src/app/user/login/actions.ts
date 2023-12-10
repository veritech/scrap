'use server'

import { User } from "@/src/entities/User";
import { getSharedDataSource } from "@/src/shared_database_connection";
import { cookies } from "next/headers"

export const loginUser = async (formData: FormData) => {
    const dataSource = await getSharedDataSource()

    const userRepo = dataSource.getRepository(User);

    const email = formData.get('email');
    if (!email || typeof email !== 'string') {
        throw new Error("invalid email");
    }

    const user = await userRepo.findOneBy({
        email
    })

    const store = cookies()

    if (user) {
        if (user.isValidated) {
            store.set('user_id', user.id)
        }

        throw new Error("User account has not been validated");
    }
}