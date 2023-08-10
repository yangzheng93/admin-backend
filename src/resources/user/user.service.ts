import { In, Not, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentService } from '../department/department.service';
import { RoleService } from '../role/role.service';
import { RolePermissionService } from '../role_permission/role_permission.service';
import { User } from './user.entity';
import { EditUserDto, UpdatePwdDto } from './user.dto';
import { DEFAULT_USER_PASSWORD } from '../../constants';
import { MD5 } from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private departmentService: DepartmentService,
    private roleService: RoleService,
    private rolePermissionService: RolePermissionService,
  ) {}

  async save(body: EditUserDto): Promise<User> {
    const params = { phone: body.phone };
    if (body.id) {
      Object.assign(params, { id: Not(body.id) });
    }

    const exist = await this.repository.findOneBy(params);
    if (exist) {
      throw new BadRequestException('该手机号已被使用');
    }

    return await this.repository.save(
      body.id
        ? body
        : Object.assign(body, {
            id: null,
            password: MD5(DEFAULT_USER_PASSWORD).toString(),
          }),
    );
  }

  async bulkCreate(users: BulkImportUserInterface[]) {
    const mapOfDepartments =
      await this.departmentService.buildMapOfDepartments();

    const namesOfDepartments = Object.keys(mapOfDepartments).reduce((a, b) => {
      return { ...a, [mapOfDepartments[b]]: b };
    }, {});

    const exists = await this.repository.find({
      where: {
        phone: In(users.map((u) => u.phone)),
      },
    });

    const mapOfExists = exists.reduce((a, b) => {
      return { ...a, [b.phone]: b };
    }, {});

    try {
      await this.repository.upsert(
        users.map((u) => {
          return {
            id: mapOfExists?.[u.phone]?.id,
            name: u.name,
            gender: u.gender,
            phone: u.phone,
            email: u.email,
            department_id: namesOfDepartments[u.department],
            password:
              mapOfExists?.[u.phone]?.password ||
              MD5(DEFAULT_USER_PASSWORD).toString(),
          };
        }),
        ['id'],
      );

      return true;
    } catch (error) {
      throw new BadRequestException('导入失败');
    }
  }

  async findAll(): Promise<any[]> {
    const users = await this.repository
      .createQueryBuilder('user')
      .select([
        'user.id as id',
        'user.name as name',
        'user.email as email',
        'user.gender as gender',
        'user.phone as phone',
        't_department.id as department_id',
        't_department.name as department_name',
        'user.created_at as created_at',
        'user.updated_at as updated_at',
        'user.is_actived as is_actived',
        'user.is_admin as is_admin',
      ])
      .leftJoin('user_role', 't_user_role', 'user.id = t_user_role.user_id')
      .leftJoin(
        'department',
        't_department',
        'user.department_id = t_department.id',
      )
      .groupBy('user.id')
      .orderBy({
        'user.created_at': 'DESC',
        'user.id': 'DESC',
      })
      .getRawMany();

    return users;
  }

  // 只返回 is_actived 的用户的 name + phone 字段
  // 用户列表下拉
  async findSimpleAll(): Promise<User[]> {
    return await this.repository.find({
      select: ['id', 'name', 'phone'],
      where: { is_actived: 1 },
      order: { created_at: 'DESC', id: 'DESC' },
    });
  }

  async findOne(query: UserSearchInterface, hasPwd = false): Promise<any> {
    const { id, phone } = query;

    const mapOfRoles = await this.roleService.buildMapOfRoles();

    let sqlChain = this.repository
      .createQueryBuilder('user')
      .select([
        'user.id as id',
        'user.name as name',
        'user.email as email',
        'user.gender as gender',
        'user.phone as phone',
        't_department.id as department_id',
        't_department.name as department_name',
        'group_concat(t_user_role.role_id) as role_ids',
        'user.created_at as created_at',
        'user.updated_at as updated_at',
        'user.is_actived as is_actived',
        'user.is_admin as is_admin',
      ]);

    if (hasPwd) {
      sqlChain = sqlChain.addSelect('user.password as password');
    }

    const user = await sqlChain
      .leftJoin('user_role', 't_user_role', 'user.id = t_user_role.user_id')
      .leftJoin(
        'department',
        't_department',
        'user.department_id = t_department.id',
      )
      .groupBy('user.id')
      .where('user.id = :id OR user.phone = :phone', { id, phone })
      .getRawOne();

    if (!user) {
      throw new BadRequestException('未找到该用户');
    }

    if (user?.is_actived) {
      const role_ids = user.role_ids
        ? user.role_ids
            .split(',')
            .map((i: string) => +i)
            .sort()
        : [];

      const permissionsInRole = await this.rolePermissionService.findAll({
        role_ids: role_ids,
      });

      // 重新整理格式
      const c = {
        ...user,
        department: {
          id: user.department_id,
          name: user.department_name,
        },
        roles: {
          ids: role_ids,
          names: role_ids?.map((id: number) => mapOfRoles[id]) || [],
        },
        permissions: Object.values(
          permissionsInRole.reduce((a, b) => {
            return {
              ...a,
              [b.permission_id]: {
                id: b.permission_id,
                name: b.permission_name,
                alias: b.permission_alias,
              },
            };
          }, {}),
        ),
      };

      delete c.department_id;
      delete c.department_name;
      delete c.role_ids;

      return c;
    } else {
      throw new BadRequestException('该用户已被停用');
    }
  }

  async updatePassword(userId: number, body: UpdatePwdDto) {
    const user = await this.findOne({ id: userId }, true);

    if (user.password !== MD5(body.oldPassword).toString()) {
      throw new BadRequestException('原密码校验失败');
    }

    await this.repository.save({
      id: user.id,
      password: MD5(body.password).toString(),
    });

    return true;
  }
}
