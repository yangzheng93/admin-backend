import { Controller, Get } from '@nestjs/common';
import { RolePermissionService } from './role_permission.service';

@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly service: RolePermissionService) {}

  // role-permission/list
  @Get('list')
  findAll() {
    return this.service.findAll();
  }
}
