import { CreateDateColumn, Entity, Index, Column, OneToMany, PrimaryColumn } from "typeorm"
import { ScrapItem } from "./ScrapItem";

@Entity()
export class User {
    
    @PrimaryColumn()
    id: number;

    @Index({ unique: true })
    @Column({name: 'email', type: 'text'})
    email: string;

    @Column({name: 'is_valdiated', type :'boolean' })
    isValdiated: boolean;

    @OneToMany(() => ScrapItem, (scrapItem) => scrapItem.user)
    scrapItems: ScrapItem[]

    @CreateDateColumn()
    created_time: Date;
}
