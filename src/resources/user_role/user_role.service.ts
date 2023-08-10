import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from './../role/role.service';
import { UserRole } from './user_role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole) private repository: Repository<UserRole>,
    private roleService: RoleService,
  ) {}

  async upsert(body: UpsertUserRoleInterface) {
    await this.repository.upsert(
      body.user_ids.map((i) => {
        return {
          id: i.id,
          role_id: body.role_id,
          user_id: i.user_id,
        };
      }),
      ['id'],
    );
  }

  async findUsers(body: GetUserByRoleInterface): Promise<any[]> {
    let { id } = body;
    const { name } = body;

    // 如果是通过name查询
    if (!id && name) {
      const role = await this.roleService.findOne(undefined, name);
      id = role.id;
    }

    const users = await this.repository
      .createQueryBuilder('user_role')
      .select([
        'user_role.id as user_role_id',
        't_user.id as user_id',
        't_user.name as name',
        't_user.phone as phone',
        't_department.id as department_id',
        't_department.name as department_name',
        't_user.created_at as created_at',
        't_user.updated_at as updated_at',
      ])
      .leftJoin('user', 't_user', 'user_role.user_id = t_user.id')
      .leftJoin(
        'department',
        't_department',
        't_user.department_id = t_department.id',
      )
      .where('user_role.role_id = :id', { id })
      .orderBy({
        'user_role.created_at': 'DESC',
      })
      .getRawMany();

    return users;
  }

  async remove(body: RemoveUserRoleInterface) {
    await this.repository.delete(body.ids);
    return null;
  }
}
