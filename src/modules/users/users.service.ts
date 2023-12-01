import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities';
import { Tuit } from '../tuits/entities/tuit.entity';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>    ) {}

    
    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        const user: User = await this.userRepository.findOneBy({id});
        if(!user) { 
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async getUserByEmail(email: any): Promise<User> {
        const user: User = await this.userRepository.findOneBy({email});
        if(!user) { 
            throw new NotFoundException('User not found');
        }
        return user;
      }


    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const userExists: User = await this.userRepository.findOneBy({email: createUserDto.email});
        if(userExists) {
            throw new NotFoundException('User already exists');
        }
        const user = this.userRepository.create(createUserDto);
        this.userRepository.save(user);
        return user;
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        const user: User = await this.userRepository.preload({
            id,
            ...userData
        });
        if(!user) {
            throw new NotFoundException('User not found');
        }
        return await this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        const user: User = await this.userRepository.findOneBy({id});
        if(!user) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.remove(user);
    }
}

