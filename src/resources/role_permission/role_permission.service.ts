import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { RolePermission } from './role_permission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private repository: Repository<RolePermission>,
    private roleService: RoleService,
  ) {}

  // 找到 role 下的所有 permissions
  async findAll(body: GetPermissionByRoleInterface): Promise<any[]> {
    let { role_ids } = body;
    const { role_name } = body;

    // 如果是通过name查询
    if (!role_ids && role_name) {
      const role = await this.roleService.findOne(undefined, role_name);
      role_ids = [role.id];
    }

    return await this.repository
      .createQueryBuilder('role_permission')
      .select([
        'role_permission.id as id',
        'role_permission.role_id as role_id',
        'role_permission.permission_id as permission_id',
        't_permission.name as permission_name',
        't_permission.alias as permission_alias',
      ])
      .leftJoin(
        'permission',
        't_permission',
        'role_permission.permission_id = t_permission.id',
      )
      .where({ role_id: In(role_ids) })
      .getRawMany();
  }

  async upsert(body: UpsertRolePermissionInterface) {
    await this.repository.upsert(
      body.permission_ids.map((i) => {
        return {
          id: i.id,
          role_id: body.role_id,
          permission_id: i.permission_id,
        };
      }),
      ['id'],
    );
  }
}
