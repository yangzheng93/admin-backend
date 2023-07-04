import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private repository: Repository<Role>) {}

  async buildMapOfRoles() {
    const roles = await this.repository.createQueryBuilder('role').getMany();

    return roles.reduce((a, b) => {
      return { ...a, [b.id]: b.name };
    }, {});
  }

  async findAll(): Promise<Role[]> {
    return await this.repository.createQueryBuilder('role').getMany();
  }
}
