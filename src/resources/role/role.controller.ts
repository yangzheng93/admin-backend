import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { EditRoleDto } from './role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  // role/save
  @Post('save')
  save(@Body() body: EditRoleDto) {
    return this.service.save(body);
  }

  // role/list
  @Get('list')
  findAll() {
    return this.service.findAll();
  }
}
