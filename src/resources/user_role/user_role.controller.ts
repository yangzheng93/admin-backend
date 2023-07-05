import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { UserRoleService } from './user_role.service';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  // @Post()
  // create(@Body() createUserRoleDto: CreateUserRoleDto) {
  //   return this.userRoleService.create(createUserRoleDto);
  // }

  // user-role/users-by-role
  @Get('users-by-role')
  findUsersByRole(@Query() query: SearchUserByRoleInterface) {
    if (!query.id && !query.name) {
      throw new BadRequestException('参数错误');
    }

    return this.service.findUsersByRole(query);
  }

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
