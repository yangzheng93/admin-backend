import {
  Controller,
  Get,
  Query,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import { UserRoleService } from './user_role.service';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  // user-role/upsert
  @Post('upsert')
  upsert(@Body() body: UpsertUserRoleInterface) {
    if (!body.role_id && !body.user_ids) {
      throw new BadRequestException('参数错误');
    }

    return this.service.upsert(body);
  }

  // user-role/users
  @Post('users')
  findUsersByRole(@Body() body: SearchUserByRoleInterface) {
    if (!body.id && !body.name) {
      throw new BadRequestException('参数错误');
    }

    return this.service.findUsers(body);
  }

  // user-role/remove
  @Post('remove')
  remove(@Body() body: RemoveUserRoleInterface) {
    if (!body.ids) {
      throw new BadRequestException('参数错误');
    }

    return this.service.remove(body);
  }
}
