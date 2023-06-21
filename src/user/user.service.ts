import { Not, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(body: CreateUserDto) {
    const exist = await this.repository.findOneBy({ phone: body.phone });
    if (exist) {
      throw new BadRequestException('该手机号已被使用');
    }

    const user = this.repository.create({ ...body });
    return await this.repository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, body: UpdateUserDto): Promise<User> {
    const exist = await this.repository.findOneBy({
      id: Not(id),
      phone: body.phone,
    });
    if (exist) {
      throw new BadRequestException('该手机号已被其他用户使用');
    }

    const user = this.repository.create({ id, ...body });
    return await this.repository.save(user);
  }
}
