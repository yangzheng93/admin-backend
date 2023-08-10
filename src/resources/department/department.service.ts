import { Not, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EditDepartmentDto } from './department.dto';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department) private repository: Repository<Department>,
  ) {}

  // [k]: [v]
  async buildMapOfDepartments() {
    const departments = await this.repository.find();

    return departments.reduce((a, b) => {
      return { ...a, [b.id]: b.name };
    }, {});
  }

  async save(body: EditDepartmentDto) {
    const params = { name: body.name };
    if (body.id) {
      Object.assign(params, { id: Not(body.id) });
    }

    const exist = await this.repository.findOneBy(params);
    if (exist) {
      throw new BadRequestException('部门已存在');
    }

    return await this.repository.save(body);
  }

  // 部门+部门负责人信息
  async findAll(): Promise<any[]> {
    return await this.repository
      .createQueryBuilder('department')
      .select([
        'department.id as id',
        'department.name as name',
        't_user.id as user_id',
        't_user.name as user_name',
        't_user.phone as user_phone',
        'department.created_at as created_at',
      ])
      .leftJoin('user', 't_user', 'department.user_id = t_user.id')
      .orderBy({
        'department.created_at': 'DESC',
        'department.id': 'DESC',
      })
      .getRawMany();
  }

  async findOne(id: number): Promise<Department> {
    return await this.repository.findOneBy({ id });
  }
}
