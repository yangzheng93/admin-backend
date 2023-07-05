import { Not, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from '../role/role.service';
import { User } from './user.entity';
import { EditUserDto, UpdatePwdDto } from './user.dto';
import { MD5 } from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private roleService: RoleService,
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
        : Object.assign(body, { id: null, password: MD5('888888').toString() }),
    );
  }

  async findAll(): Promise<User[]> {
    const mapOfRoles = await this.roleService.findMapOfRoles();

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
        'group_concat(t_user_role.role_id) as role_ids',
        'user.created_at as created_at',
        'user.updated_at as updated_at',
        'user.is_actived as is_actived',
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

    return users.map((i) => {
      return {
        ...i,
        role_ids: i.role_ids?.split(',') || [],
        role_names: Array.from(
          new Set(
            i.role_ids
              ?.split(',')
              ?.sort()
              ?.map((id: string | number) => mapOfRoles[id]) || [],
          ),
        ),
      };
    });
  }

  // 只返回 is_actived 的用户的 name + phone 字段
  async findSimpleAll(): Promise<User[]> {
    return await this.repository.find({
      select: ['id', 'name', 'phone'],
      where: { is_actived: '1' },
      order: { created_at: 'DESC', id: 'DESC' },
    });
  }

  async findOne(query: UserSearchInterface, hasPwd = false): Promise<User> {
    const { id, phone } = query;

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
        'user.created_at as created_at',
        'user.updated_at as updated_at',
        'user.is_actived as is_actived',
      ]);

    if (hasPwd) {
      sqlChain = sqlChain.addSelect('user.password as password');
    }

    const user = await sqlChain
      .leftJoin(
        'department',
        't_department',
        'user.department_id = t_department.id',
      )
      .where('user.id = :id OR user.phone = :phone', { id, phone })
      .getRawOne();

    if (!user) {
      throw new BadRequestException('未找到该用户');
    }

    if (user?.is_actived) {
      return user;
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
