import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditDepartmentDto {
  @IsOptional()
  id: number;

  @IsNotEmpty({ message: '部门名称不能为空' })
  name: string;

  user_id: number;
}
