import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly JwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.UserService.getByEmail(email);
    if (!user) throw new NotFoundException();
    if (!bcrypt.compare(pass, user.password)) throw new UnauthorizedException();

    const playload = { sub: user._id, email: user.email, role: user.role };

    return {
      accessToken: await this.JwtService.signAsync(playload),
    };
  }
}
