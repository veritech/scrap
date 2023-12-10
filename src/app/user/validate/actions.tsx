'use server'

import { User } from "@/src/entities/User";
import { UserManager } from "@/src/managers/user_manager";
import { getSharedDataSource } from "@/src/shared_database_connection"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginUser = async (user: User): Promise<User> => {
    const store = cookies();

    if (user) {
        if (user.isValidated) {
            store.set('user_id', user.id)
        }

        throw new Error("User account has not been validated");
    }

    return Promise.resolve(user);
}

export const validateUserToken = async (token: string) => {
    const datasource = await getSharedDataSource();

    const userManager = new UserManager(datasource.getRepository(User));

    const user = await userManager.validateToken(token);

    loginUser(user);

    redirect('/');
}