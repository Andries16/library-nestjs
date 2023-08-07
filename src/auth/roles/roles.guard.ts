import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role.enum';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly JwtService: JwtService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const token = context.switchToHttp().getRequest().headers.accesstoken;
    type PayloadType = {
      role: Role;
    };
    const user = this.JwtService.decode(token) as PayloadType;
    if (!user || !this.JwtService.verify(token))
      throw new UnauthorizedException();
    return requiredRoles.some((role) => user.role == role);
  }
}
