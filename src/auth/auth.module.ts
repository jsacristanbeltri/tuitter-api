import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../modules/users/entities'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './Utils/google.strategy';
import { SessionSerializer } from './utils/Serializer';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { ConfigModule } from '@nestjs/config';
import { UserProfile } from 'src/modules/users/entities/userProfile.entity';
import { Role } from 'src/modules/users/entities/role.entity';
import { JwtStrategy } from './Utils/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Utils/local.strategy';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, Role]), 
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secrete',
      signOptions: { expiresIn: '1h' },
  }),],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    JwtStrategy,
    UsersService,
    AuthService,
    LocalStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    }
  ],
  exports: [AuthService],
})
export class AuthModule {}
