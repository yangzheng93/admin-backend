import { Controller, Get, Req } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  // permission/list
  @Get('list')
  findAll() {
    return this.service.findAll();
  }
}
