import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/resources/user/user.service';
import { MD5 } from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(phone: string, password: string) {
    const user = await this.userService.findOne({ phone }, true);

    if (user?.password !== MD5(password).toString()) {
      throw new BadRequestException('登录信息校验失败');
    }

    return {
      user_id: user.id,
      token: await this.jwtService.signAsync({ sub: user.id, user: user }),
    };
  }
}
