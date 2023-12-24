import { CreateDateColumn, Entity, Index, Column, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { ScrapItem } from "./ScrapItem";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({ unique: true })
    @Column({name: 'email', type: 'text'})
    email: string;

    @Column({name: 'is_validated', type :'boolean' })
    isValidated: boolean;

    @OneToMany(() => ScrapItem, (scrapItem) => scrapItem.user)
    scrapItems: ScrapItem[]

    @CreateDateColumn({ name: "created_time"})
    createdTime: Date;
}
