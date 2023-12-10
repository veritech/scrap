import { Column, DeleteDateColumn, Entity, Index, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Relation } from "typeorm"
import { User } from "./User";

@Entity()
export class ScrapItem {

    @PrimaryColumn()
    id: number;

    @Column({name: 'latitude', type: 'number'})
    latitude: number;

    @Index
    @Column({name: 'longitude', type: 'number'})
    longitude: number;

    @Column({name: 'description', type: 'text'})
    description: string;

    @ManyToOne(() => User, (user) => user.scrapItems)
    user: Relation<User>;

    @CreateDateColumn({ name: 'created_time' })
    created_time: Date;

    @DeleteDateColumn({name: 'deleted_time'})
    deleted_time: Date;
}
