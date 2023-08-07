import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
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

    const req = context.switchToHttp().getRequest();
    type PayloadType = {
      role: Role;
    };
    const user = this.JwtService.decode(req.headers.accesstoken) as PayloadType;
    if (!user) throw new UnauthorizedException(user);
    return requiredRoles.some((role) => user.role == role);
  }
}
