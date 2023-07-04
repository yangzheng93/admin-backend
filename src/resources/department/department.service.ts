import { Not, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDto, UpdateDepartmentDto } from './department.dto';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department) private repository: Repository<Department>,
  ) {}

  async create(body: CreateDepartmentDto) {
    const exist = await this.repository.findOneBy({ name: body.name });
    if (exist) {
      throw new BadRequestException('部门已存在');
    }

    return await this.repository.save(body);
  }

  findAll(): Promise<Department[]> {
    return this.repository
      .createQueryBuilder('department')
      .select([
        'department.id as id',
        'department.name as name',
        't_user.id as user_id',
        't_user.name as username',
        't_user.phone as phone',
        'department.created_at as created_at',
      ])
      .leftJoin('user', 't_user', 'department.user_id = t_user.id')
      .orderBy({
        'department.created_at': 'DESC',
        'department.id': 'DESC',
      })
      .getRawMany();
  }

  findOne(id: number): Promise<Department> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, body: UpdateDepartmentDto): Promise<Department> {
    const exist = await this.repository.findOneBy({
      id: Not(id),
      name: body.name,
    });
    if (exist) {
      throw new BadRequestException('部门已存在');
    }

    const department = this.repository.create({ id, ...body });
    return await this.repository.save(department);
  }
}
