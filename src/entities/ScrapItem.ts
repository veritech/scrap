import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm"
import { User } from "./User";

@Entity()
export class ScrapItem {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({name: 'latitude', type: 'numeric', precision: 5, scale: 2})
    latitude: number;

    @Index()
    @Column({name: 'longitude', type: 'numeric', precision: 5, scale: 2})
    longitude: number;

    @Column({name: 'description', type: 'text'})
    description: string;

    @Column({name: 'address', type: 'text'})
    address: string;

    @ManyToOne(() => User, (user) => user.scrapItems)
    @JoinColumn({ name: 'user_id' })
    // @ts-ignore
    user: Relation<User>;

    @CreateDateColumn({ name: 'created_time' })
    createdTime: Date;

    @DeleteDateColumn({name: 'deleted_time'})
    deletedTime: Date;
}
