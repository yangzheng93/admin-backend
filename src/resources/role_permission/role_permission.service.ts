import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { RolePermission } from './role_permission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private repository: Repository<RolePermission>,
    private roleService: RoleService,
  ) {}

  // 找到某个 role 下的所有 permissions
  async findAll(body: GetPermissionByRoleInterface): Promise<RolePermission[]> {
    let { id } = body;
    const { name } = body;

    // 如果是通过name查询
    if (!id && name) {
      const role = await this.roleService.findOne(undefined, name);
      id = role.id;
    }

    return await this.repository.find({
      where: { role_id: id },
    });
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
