'use server'
import { User } from "@/src/entities/User";
import { UserManager } from "@/src/managers/user_manager";
import { getSharedDataSource } from "@/src/shared_database_connection";
import { redirect } from "next/navigation";

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