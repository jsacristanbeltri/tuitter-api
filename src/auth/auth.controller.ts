import { Controller, Get, Req, UseGuards, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
    
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
      return { msg: 'Google Authentication' };
    }
  
    // api/auth/google/redirect
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
      return { msg: 'OK' };
    }
  
    @Get('status')
    user(@Req() request: Request) {
      console.log(request.user);
      if (request.user) {
        return { msg: 'Authenticated' };
      } else {
        return { msg: 'Not Authenticated' };
      }
    }
  }