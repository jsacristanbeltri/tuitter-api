import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UsersController } from './users.controller';
import { Tuit } from '../tuits/entities/tuit.entity';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tuit,User])
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
