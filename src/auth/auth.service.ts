import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../modules/users/entities'
import { UserDetails } from '../utils/types';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { IAuthenticate } from './Utils/i_authenticate';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, roles: user.role[0] };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  async signIn(email, pass): Promise<IAuthenticate> {
    const user = await this.usersService.getUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username, role: user.role[0]};
    const token = await this.jwtService.signAsync(payload);
    //const token = sign({ ...user}, 'secrete')
    return {token,user};
  }

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('Validate User (username: ' + username);
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      console.log ('user found on db: ' + user)
      return user;
    } 
    return null;   
  }

  async validateGoogleUser(details: UserDetails) {
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
      const newUser = this.userRepository.create(details);
      return this.userRepository.save(newUser);
    }
    
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
