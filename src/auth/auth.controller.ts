import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.AuthService.signIn(signInDto.email, signInDto.password);
  }
}
