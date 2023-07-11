import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { RolePermissionService } from './role_permission.service';

@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly service: RolePermissionService) {}

  // role-permission/list
  @Post('list')
  @HttpCode(200)
  findAll(@Body() body: GetPermissionByRoleInterface) {
    if (!body.role_ids && !body.role_name) {
      throw new BadRequestException('参数错误');
    }

    return this.service.findAll(body);
  }

  // role-permission/upsert
  @Post('upsert')
  @HttpCode(200)
  upsert(@Body() body: UpsertRolePermissionInterface) {
    if (!body.role_id && !body.permission_ids) {
      throw new BadRequestException('参数错误');
    }

    return this.service.upsert(body);
  }
}
