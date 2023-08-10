import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  Get,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UserService } from './user.service';
import { EditUserDto, UpdatePwdDto } from './user.dto';
import * as CsvToJson from 'csvtojson';

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
  findSimpleAll() {
    return this.service.findSimpleAll();
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

  // user/bulk-import
  @UseInterceptors(FileInterceptor('file'))
  @Post('bulk-import')
  async toBulkImport(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('参数错误');
    }

    try {
      const users = await CsvToJson({
        headers: ['name', 'gender', 'phone', 'email', 'department'],
      }).fromString(file.buffer.toString());

      if (
        users.some((row) => {
          return !row.name || !row.phone || !row.department;
        })
      ) {
        throw new BadRequestException(
          '姓名、手机号和部门名称不能为空，请填写后重新导入',
        );
      }

      const uniquedPhones = Array.from(new Set(users.map((row) => row.phone)));
      if (uniquedPhones.length < users.length) {
        throw new BadRequestException('文件中存在相同手机号，请修改后重新导入');
      }

      return this.service.bulkCreate(users);
    } catch (error) {
      throw new BadRequestException('文件读取失败');
    }
  }
}
