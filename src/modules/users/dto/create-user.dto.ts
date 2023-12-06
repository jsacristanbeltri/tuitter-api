import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, IsDate } from 'class-validator';

export class CreateUserDto {
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

    @IsString()
    displayName: string;

    @IsString()
    @MaxLength(30)
    address: string;

    @IsString()
    @MaxLength(30)
    phone: string;

    @IsDate()
    birthdate: Date;


    
  }