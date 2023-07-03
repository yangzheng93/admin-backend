import { Not, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from '../role/role.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

interface UserSearchInterface {
  id?: number;
  phone?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async create(body: CreateUserDto) {
    const exist = await this.repository.findOneBy({ phone: body.phone });
    if (exist) {
      throw new BadRequestException('该手机号已被使用');
    }

    return await this.repository.save(body);
  }

  async findAll(): Promise<User[]> {
    const mapOfRoles = await this.roleService.buildMapOfRoles();

    const users = await this.repository
      .createQueryBuilder('user')
      .select([
        'user.id as id',
        'user.name as name',
        'user.email as email',
        'user.gender as gender',
        'user.phone as phone',
        'user.department_id as department_id',
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

  async findOne(body: UserSearchInterface): Promise<User> {
    const { id, phone } = body;

    const user = await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id OR user.phone = :phone', { id, phone })
      .getOne();

    if (!user) {
      throw new BadRequestException('未找到该用户');
    } else {
      if (user?.is_actived) {
        return user;
      } else {
        throw new BadRequestException('该用户已被停用');
      }
    }
  }

  async update(id: number, body: UpdateUserDto): Promise<User> {
    const exist = await this.repository.findOneBy({
      id: Not(id),
      phone: body.phone,
    });
    if (exist) {
      throw new BadRequestException('该手机号已被其他用户使用');
    }

    // const user = this.repository.create();
    return await this.repository.save({ id, ...body });
  }
}
