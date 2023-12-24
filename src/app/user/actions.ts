'use server'

import { User } from "@/src/entities/User";
import { getSharedDataSource } from "@/src/shared_database_connection";
import { cookies } from "next/headers"
import { UserManager } from "@/src/managers/user_manager";
import { redirect } from "next/navigation";
const sg = require("@sendgrid/mail");

const domain = process.env.PUBLIC_DOMAIN || 
"https://scrap-production-8796.up.railway.app/";

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

const sendEmail = async (email: string, text: string) => {
    const key = process.env.SEND_GRID_API_KEY;
    if (!key) {
        console.log("===========");
        console.log('No SG API key suppied so email sending is disabled');
        console.log("===========");
        console.log(text);
        console.log("===========");

        return Promise.resolve();
    }

    // Send email via send grid
    sg.setApiKey(process.env.SEND_GRID_API_KEY);

    const msg = {
        to: email,
        from: "jonathan@float-Right.co.uk",
        subject: "validate email",
        text
    }

    return await sg.send(msg);
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

    console.log("verification token", token);

    await sendEmail(email, `
Hi!

You need to validate your email.
Use this link to validate your email\n ${domain}user/validate?token=${token}

Thanks
Scrap App
`)
        .then(() => {
            console.log(`Email sent for ${user.id}`);
        })
        // @ts-ignore
        .catch(e => {
            console.error("email send failed", e);

            throw new Error("unable to send verification email");
        });

    redirect('/user/validate');
}

export const loginUser = async (user: User): Promise<User> => {
    console.log(`loginUser ${user.id}`)
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

    console.log('store', store);

    const cookie = store.get('user_id');
    if (!cookie || !cookie.value) {
        throw new Error("No current user found")
    }

    const userRepository = datasource.getRepository(User);

    return userRepository.findOneByOrFail({
        id: cookie.value
    }).then(r => mapEntityToDto(r));
}

export const validateUserAndSendEmail = async (formData: FormData) => {
    const datasource = await getSharedDataSource();
    const userRepository = datasource.getRepository(User);
    const userManager = new UserManager(datasource.getRepository(User));

    const email = formData.get('email');
    if (!email || typeof email !== 'string') {
        throw new Error("invalid email");
    }

    const user = await userRepository.findOneByOrFail({
        email
    });

    const token = userManager.generateValidationToken(user);

    console.log("login token", token);

    await sendEmail(email, `
Hi!

Please use this link to login \n ${domain}user/login?token=${token}

Thanks
Scrap app
`)
        .then(() => {
            console.log(`Login email sent for ${user.id}`);  
        })
        // @ts-ignore
        .catch(e => {
            console.error("email send failed", e);

            throw new Error("unable to send verification email");
        });

    redirect(`/user/sent-email/${user.id}`);
}
