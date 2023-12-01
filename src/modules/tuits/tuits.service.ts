import { Injectable, NotFoundException } from '@nestjs/common';
import { Tuit } from 'src/modules/tuits/entities/tuit.entity';
import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class TuitsService {

    constructor(
        @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    //puedes generar todos los metodos crud?
    //get all   
    async getAllTuits({limit,offset}: PaginationQueryDto): Promise<Tuit[]> {
        return await this.tuitRepository.find({relations: ['user'], take: limit, skip: offset});
    }
    
    //get one
    async getTuit(id: number): Promise<Tuit> {
        const tuit: Tuit = await this.tuitRepository.findOne({ 
            where: { id },
            relations: ['user']
        });
        if (!tuit) {
            throw new NotFoundException('Tuit not found');
        }

        return tuit;
    }

    //create one
    async createTuit(createTuitDto: CreateTuitDto) : Promise<Tuit> {
        const user: User = await this.userRepository.findOneBy({email: createTuitDto.email});
        if(!user) {
            throw new NotFoundException('User not found');
        }
        const newTuit: Tuit = this.tuitRepository.create({
            message: createTuitDto.message,
            user: user
        })
        this.tuitRepository.save(newTuit);
        return newTuit;
    }

    //update one
    async updateTuit(id: number, updateTuitDto: UpdateTuitDto): Promise<Tuit> {
        const tuit: Tuit = await this.tuitRepository.preload({
            id,
            ...updateTuitDto
        });
        if (!tuit) {
            throw new NotFoundException('Tuit not found');
        }

        return await this.tuitRepository.save(tuit);
    }


    //delete one
    async deleteTuit(id: number): Promise<void> {
        const tuit: Tuit = await this.getTuit(id);
        if(!tuit)
        {
            throw new NotFoundException('Tuit not found');
        }
        else
        {
            this.tuitRepository.remove(tuit);
        }
    }


}
