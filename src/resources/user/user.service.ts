import { Not, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

interface UserSearchInterface {
  id?: number;
  name?: string;
  phone?: string;
}

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(body: CreateUserDto) {
    const exist = await this.repository.findOneBy({ phone: body.phone });
    if (exist) {
      throw new BadRequestException('该手机号已被使用');
    }

    // const user = this.repository.create({ ...body });
    return await this.repository.save(body);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(body: UserSearchInterface): Promise<User> {
    const { id, name = '', phone = '' } = body;

    const user = await this.repository.findOneBy([{ id }, { name }, { phone }]);

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
