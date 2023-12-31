import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Tuit {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  message: string;

  @ManyToOne((type) => User, (user) => user.tuits, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => User, (user) => user.likedTuits)
  likes?: User[];
}
