import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    addres: string;

    @Column({nullable: false})
    phone: string;

    @Column({nullable: false})
    birthdate: Date;

    @OneToOne(() => User, (user) => user.profile)
    user: User;
}