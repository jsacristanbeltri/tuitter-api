import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRoles: string[]): boolean {
    return roles.some((role) => userRoles?.includes(role));
  
  }

  canActivate(context: ExecutionContext): boolean {
    console.log("RolesGuard: Validating user's role")
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    //const roles = this.reflector.get<string[]>('roles', context.getHandler());

    console.log('the required roles are: ', requiredRoles);

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('the user on request is: ', request.user);
    const user = request.user;
    console.log('the user role is: ', user);
    return this.matchRoles(requiredRoles, user.role);
    //const { user } = context.switchToHttp().getRequest();
    //return requiredRoles.some((role) => user.roles?.includes(role));
  }
}