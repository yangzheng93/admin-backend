import {
  Controller,
  BadRequestException,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UserRoleService } from './user_role.service';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  // user-role/upsert
  @Post('upsert')
  @HttpCode(200)
  upsert(@Body() body: UpsertUserRoleInterface) {
    if (!body.role_id && !body.user_ids) {
      throw new BadRequestException('参数错误');
    }

    return this.service.upsert(body);
  }

  // user-role/users
  @Post('users')
  @HttpCode(200)
  findUsersByRole(@Body() body: GetUserByRoleInterface) {
    if (!body.id && !body.name) {
      throw new BadRequestException('参数错误');
    }

    return this.service.findUsers(body);
  }

  // user-role/remove
  @Post('remove')
  @HttpCode(200)
  remove(@Body() body: RemoveUserRoleInterface) {
    if (!body.ids) {
      throw new BadRequestException('参数错误');
    }

    return this.service.remove(body);
  }
}
