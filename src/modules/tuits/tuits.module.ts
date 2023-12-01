import { Module } from '@nestjs/common';

import { TuitsController } from './tuits.controller';
import { TuitsService } from './tuits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuit } from './entities/tuit.entity';
import { User } from '../users/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Tuit,User])],
    controllers: [TuitsController],
    providers: [TuitsService],
})
export class TuitsModule {}
