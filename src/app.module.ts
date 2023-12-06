import { Module } from '@nestjs/common';

import { TuitsModule } from './modules/tuits/tuits.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/Utils/roles.guard';
import { APP_GUARD } from '@nestjs/core';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TuitsModule,
    UsersModule,
    DatabaseModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  static port: number;
  static secret: string;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
    AppModule.secret = this.configService.get('JWT_SECRET');
  }
}
