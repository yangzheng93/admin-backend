import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { PublicAuth } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @PublicAuth()
  @Post('login')
  login(@Body() body: AuthLoginDto) {
    return this.service.login(body.phone, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('user-info')
  getUserInfo(@Request() req: any) {
    return req['user-info'];
  }
}
