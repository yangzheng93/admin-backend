import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class EditUserDto {
  @IsOptional()
  id: number;

  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: '无效的邮箱' })
  email: string;

  @IsNotEmpty({ message: '手机号不能为空' })
  @IsMobilePhone('zh-CN', {}, { message: '无效的手机号' })
  phone: string;

  @IsOptional()
  password: string;

  department_id: number;
}

export class UpdatePwdDto {
  @IsNotEmpty({ message: '原密码不能为空' })
  oldPassword: string;

  @IsNotEmpty({ message: '新密码不能为空' })
  password: string;

  @IsNotEmpty({ message: '确认密码不能为空' })
  confirmed: string;
}
