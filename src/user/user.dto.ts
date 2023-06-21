import { PartialType } from '@nestjs/mapped-types';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;

  @IsNotEmpty({ message: '手机号不能为空' })
  @IsMobilePhone('zh-CN', {}, { message: '无效的手机号' })
  phone: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  department_id: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
