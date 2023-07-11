import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RolePermissionModule } from '../role_permission/role_permission.module';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';

@Module({
  imports: [RolePermissionModule, TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
