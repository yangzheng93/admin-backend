import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermissionService } from '../role_permission/role_permission.service';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) private repository: Repository<Permission>,
    private rolePermissionService: RolePermissionService,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.repository
      .createQueryBuilder('permission')
      .select([
        'permission.id as id',
        'permission.name as name',
        'permission.alias as alias',
        't_permission_group.id as group_id',
        't_permission_group.name as group_name',
      ])
      .leftJoin(
        'permission_group',
        't_permission_group',
        'permission.permission_group_id = t_permission_group.id',
      )
      .getRawMany();
  }
}
