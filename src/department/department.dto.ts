import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;

  user_id: number;
}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}
