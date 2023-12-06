import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UsersController } from './users.controller';
import { Tuit } from '../tuits/entities/tuit.entity';
import { UsersService } from './users.service';
import { UserProfile } from './entities/userProfile.entity';
import { Role } from './entities/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tuit,User, UserProfile, Role])
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
