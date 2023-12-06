import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role {

    @PrimaryGeneratedColumn('increment')
    id: number;    

    @Column({nullable: false, unique: true})
    roleName: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}