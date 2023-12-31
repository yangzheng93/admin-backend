import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { PublicAuth } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @PublicAuth()
  @Post('login')
  @HttpCode(200)
  login(@Body() body: AuthLoginDto) {
    return this.service.login(body.phone, body.password);
  }
}
