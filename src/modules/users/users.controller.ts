import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/common/enum';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/auth/Utils/roles.guard';
import { JwtAuthGuard } from 'src/auth/Utils/jwt.auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/Utils/local-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Get()  
    getAllUsers(): Promise<User[]>	 {
        return this.usersService.getUsers();
    }

    @Get('/:id')
    @Roles(Role.User, Role.Admin)
    @UseGuards(JwtAuthGuard)
    async getUserById(@Req() req, @Res() res,@Param('id') id: number): Promise<User> {
        console.log('the request is: ', req.user);
        const response = await this.usersService.getUserById(id);
        console.log('response: ', response);
        return res.status(HttpStatus.OK).json({response});
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Roles(Role.User, Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Roles(Role.User, Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }
}
    




