import { Repository } from "typeorm";
import { User } from "../entities/User";
import { sign, verify, JwtPayload } from 'jsonwebtoken';

const SERVER_SECRET = 's';

export class UserManager {
    userRepository: Repository<User>

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async createUser(email: unknown): Promise<User> {
        if (!email || typeof email !== 'string') {
            throw new Error("invalid email")
        }
    
        const user = await this.userRepository.findOneBy({
            email
        })
    
        if (user) {
            // User exists, are you trying to login?
            throw new Error(`User with that email already exists`)
        }
    
        return await this.userRepository.save({
            email,
            isValidated: false
        })
    }

    validateToken(token: string): Promise<User> {
        try {
            const decoded = verify(token, SERVER_SECRET) as JwtPayload;
            // const foo = decode(token)
            console.log('decoded', decoded);

            const userId =  decoded['userId'];

            this.userRepository.update({
                id: userId
            }, {
                isValidated: true
            });

            return this.userRepository.findOneByOrFail({
                id: userId
            })
        }
        catch(err) {
            console.error(err);
            throw new Error("unable to valid token");
        }

    }
    
    generateValidationToken(user: User): string {        
        return sign({
                userId: user.id
            }, 
            SERVER_SECRET, 
            {
                expiresIn: '1h'
            });
    }
}