'use server'

import { User } from "@/src/entities/User";
import { getSharedDataSource } from "@/src/shared_database_connection";
import { cookies } from "next/headers"
import { UserManager } from "@/src/managers/user_manager";
import { redirect } from "next/navigation";

export interface UserDto {
    id: string
    email: string
}

const mapEntityToDto = (entity: User): UserDto => {
    const {
        id,
        email,
    } = entity;

    return {
        id,
        email,
    }
}

export const validateAndCreateUser = async (formData: FormData) => {
    const dataSource = await getSharedDataSource()

    const userRepo = dataSource.getRepository(User);

    const userManager = new UserManager(userRepo);

    
    const email = formData.get('email');
    if (!email || typeof email !== 'string') {
        throw new Error("invalid email")
    }

    const user = await userManager.createUser(email);

    const token = userManager.generateValidationToken(user);

    // Send email via send grid
    console.log("token", token);

    redirect('/user/validate');
}

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

export const getCurrentUser = async (): Promise<UserDto> => {
    const datasource = await getSharedDataSource();

    const store = cookies();

    const { value } = store.get('user_id');

    if (!value) {
        throw new Error("No user found")
    }

    const userRepository = datasource.getRepository(User);

    return userRepository.findOneByOrFail({
        id: value
    }).then(r => mapEntityToDto(r));
}
