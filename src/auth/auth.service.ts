import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { MD5 } from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(phone: string, password: string) {
    const user = await this.userService.findOne({ phone });
    if (`${user?.password}` !== `${MD5(password)}`) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      name: user.name,
      token: await this.jwtService.signAsync({
        sub: user.id,
        name: user.name,
        phone: user.phone,
      }),
    };
  }
}
