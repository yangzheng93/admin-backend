import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  // role/list
  @Get('list')
  findAll() {
    return this.service.findAll();
  }
}
