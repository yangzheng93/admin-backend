import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { EditRoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private repository: Repository<Role>) {}

  // [k]: [v]
  async buildMapOfRoles() {
    const roles = await this.findAll();

    return roles.reduce((a, b) => {
      return { ...a, [b.id]: b.name };
    }, {});
  }

  async save(body: EditRoleDto): Promise<Role> {
    const exist = await this.repository.findOneBy({ name: body.name });
    if (exist) {
      throw new BadRequestException('该角色已存在');
    }

    return await this.repository.save(body);
  }

  async findAll(): Promise<Role[]> {
    return await this.repository.find({
      order: { created_at: 'ASC', id: 'ASC' },
    });
  }

  async findOne(id?: number, name?: string): Promise<Role> {
    const role = await this.repository.findOneBy([{ id }, { name }]);

    if (!role) {
      throw new BadRequestException('未找到该角色信息');
    }

    return role;
  }
}
