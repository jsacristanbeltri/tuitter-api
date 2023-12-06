import { SetMetadata } from '@nestjs/common';
import { Role } from './enum/role.enum';

export const Roles = (...args: string[]) => SetMetadata('roles', args);