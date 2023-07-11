import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PermissionGroupService } from './permission_group.service';
import { PermissionGroupController } from './permission_group.controller';
import { PermissionGroup } from './permission_group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionGroup])],
  controllers: [PermissionGroupController],
  providers: [PermissionGroupService],
})
export class PermissionGroupModule {}
