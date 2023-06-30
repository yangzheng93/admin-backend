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

    const department = this.repository.create({ ...body });
    return await this.repository.save(department);
  }

  findAll(): Promise<Department[]> {
    return this.repository.find();
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
