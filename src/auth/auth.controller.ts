import { Controller, Get, Req, UseGuards, Post, HttpStatus, HttpCode, Body, Res, Request, Response } from '@nestjs/common';
import { GoogleAuthGuard } from './Utils/google.auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './Utils/jwt.auth.guard';
import { LocalAuthGuard } from './Utils/local-auth.guard';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { RolesGuard } from './Utils/roles.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async signIn(@Request() req, @Response() res) {
    try {
      console.log('IN Auth/login request.user:', req.user);   
      const response = await this.authService.login(req.user)
      console.log('OUT Auth/login response:', response);
      return res.status(HttpStatus.OK).json({response});
    } catch (error) {
      console.log('OUT Auth/login error:', error);
      return res.status(error.status).json(error.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('roleUser')
  getUser(@Request() req) {
    return req.user;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('roleAdmin')
  getAdmin(@Request() req) {
    return req.user;
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin() {

  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Request() req) {
    const token = await this.authService.signIn(req.user.email, req.user.password);
    return token;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  user(@Request() req) {
    console.log(req.user);
    if (req.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}