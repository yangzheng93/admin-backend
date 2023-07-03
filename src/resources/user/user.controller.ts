import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

interface UserSearchInterface {
  id?: number;
  name?: string;
  phone?: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  // user/create
  @Post('create')
  create(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }

  // user/list
  @Post('list')
  @HttpCode(200)
  findAll() {
    return this.service.findAll();
  }

  // user/find-one
  @Post('find-one')
  findOne(@Body() body: UserSearchInterface) {
    if (!body.id && !body.phone) {
      throw new BadRequestException('参数错误');
    }

    return this.service.findOne(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.update(+id, body);
  }
}
