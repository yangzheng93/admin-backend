import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRoleService } from './user_role.service';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  // @Post()
  // create(@Body() createUserRoleDto: CreateUserRoleDto) {
  //   return this.userRoleService.create(createUserRoleDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userRoleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userRoleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
  //   return this.userRoleService.update(+id, updateUserRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userRoleService.remove(+id);
  // }
}
