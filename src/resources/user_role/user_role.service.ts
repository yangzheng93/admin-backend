import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from './../role/role.service';
import { UserRole } from './user_role.entity';
import { User } from '../user/user.entity';
// import { CreateUserRoleDto } from './dto/create-user_role.dto';
// import { UpdateUserRoleDto } from './dto/update-user_role.dto';

@Injectable()
export class UserRoleService {
  // create(createUserRoleDto: CreateUserRoleDto) {
  //   return 'This action adds a new userRole';
  // }
  constructor(
    @InjectRepository(UserRole) private repository: Repository<UserRole>,
    private roleService: RoleService,
  ) {}

  async findUsersByRole(query: SearchUserByRoleInterface): Promise<User[]> {
    let { id } = query;
    const { name } = query;

    if (!id && name) {
      const role = await this.roleService.findOne(undefined, name);
      id = role.id;
    }

    const users = await this.repository
      .createQueryBuilder('user_role')
      .select([
        't_user.id as id',
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
      .getRawMany();

    return users;
  }
}
