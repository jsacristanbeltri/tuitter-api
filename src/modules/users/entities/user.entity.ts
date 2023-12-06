import {
    AfterLoad,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
import { Tuit } from 'src/modules/tuits/entities/tuit.entity';
import { UserProfile } from './userProfile.entity';
import { Role } from '../../../common/enum/role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, length: 30 })
  name: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @OneToMany((type) => Tuit, (tuit) => tuit.user)
  tuits: Tuit[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({nullable: false})
  displayName: string;

  @ManyToMany(() => Tuit, (tuit) => tuit.likes)
  @JoinTable()
  likedTuits?: Tuit[];

  @OneToOne(() => UserProfile, (profile) => profile.user)
  @JoinColumn({ name: 'profile_id'})
  profile: UserProfile;

  /*@ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id'})
  role: Role;*/

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User]
  })
  role: Role[];
}