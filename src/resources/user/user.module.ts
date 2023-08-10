import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from '../department/department.module';
import { RoleModule } from '../role/role.module';
import { RolePermissionModule } from '../role_permission/role_permission.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [
    DepartmentModule,
    RoleModule,
    RolePermissionModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
