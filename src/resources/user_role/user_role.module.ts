import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleService } from './user_role.service';
import { UserRoleController } from './user_role.controller';
import { UserRole } from './user_role.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [RoleModule, TypeOrmModule.forFeature([UserRole])],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
