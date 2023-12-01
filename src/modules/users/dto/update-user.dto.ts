import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    name: string;
  
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    username: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6) // Ajusta el mínimo requerido para la contraseña
    password: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  }