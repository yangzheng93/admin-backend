import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { EditUserDto, UpdatePwdDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  // user/save
  @Post('save')
  save(@Body() body: EditUserDto) {
    return this.service.save(body);
  }

  // user/list
  @Post('list')
  @HttpCode(200)
  findAll() {
    return this.service.findAll();
  }

  // user/simple-list
  @Post('simple-list')
  @HttpCode(200)
  findAllOfSimple() {
    return this.service.findAllOfSimple();
  }

  // user/find-one
  @Get('find-one')
  findOne(@Query() query: UserSearchInterface) {
    if (!query.id && !query.phone) {
      throw new BadRequestException('参数错误');
    }

    return this.service.findOne(query);
  }

  // user/current-info
  // 根据 token 返回当前登录用户
  @Get('current-info')
  findCurrentUserInfo(@Req() req: Request) {
    const cur = req?.['user-info'];
    if (cur?.sub) {
      return this.service.findOne({ id: +cur.sub });
    }

    return null;
  }

  // user/update-password
  @Post('update-password')
  updatePassword(@Body() body: UpdatePwdDto, @Req() req: Request) {
    if (body.password !== body.confirmed) {
      throw new BadRequestException('两次输入的密码不一致');
    }

    const cur = req?.['user-info'];
    if (cur?.sub) {
      return this.service.updatePassword(+cur.sub, body);
    }
  }
}
