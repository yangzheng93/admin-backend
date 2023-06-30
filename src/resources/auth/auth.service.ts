import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/resources/user/user.service';
import { MD5 } from 'crypto-js';
import { buildDirectProperties } from 'src/utils/funcs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(phone: string, password: string) {
    const user = await this.userService.findOne({ phone });

    if (`${user?.password}` !== `${MD5(password)}`) {
      throw new BadRequestException('登录信息验证失败');
    }

    return {
      user: buildDirectProperties(user, [
        'id',
        'name',
        'email',
        'phone',
        'gender',
        'department_id',
      ]),
      token: await this.jwtService.signAsync({
        sub: user.id,
        name: user.name,
        phone: user.phone,
      }),
    };
  }
}
