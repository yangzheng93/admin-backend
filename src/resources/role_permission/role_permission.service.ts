import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermission } from './role_permission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private repository: Repository<RolePermission>,
  ) {}

  // 找到某个 role 下的所有 permissions
  async findAll() {
    return this.repository.find({
      select: ['id', 'role_id', 'permission_id'],
    });
  }
}
