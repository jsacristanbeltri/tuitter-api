import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../modules/users/entities'
import { UserDetails } from '../utils/types';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signIn(email, pass) {
    const user = await this.usersService.getUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(details: UserDetails) {
    console.log('AuthService');
    console.log(details);
    const email = details.email;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      console.log ('user found on db: ')
      console.log(user);
      return user;
    } else{
      console.log('User not found. Creating...');
      details.name = '1234'
      const newUser = this.userRepository.create(details);
      return this.userRepository.save(newUser);
    }
    
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
