import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { EditRoleDto } from './role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  // role/save
  @Post('save')
  @HttpCode(200)
  save(@Body() body: EditRoleDto) {
    return this.service.save(body);
  }

  // role/list
  @Get('list')
  findAll() {
    return this.service.findAll();
  }
}
