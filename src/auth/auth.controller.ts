import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  login(@Body() body: AuthLoginDto) {
    return this.service.login(body.phone, body.password);
  }
}
