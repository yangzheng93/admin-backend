import { IsNotEmpty } from 'class-validator';

export class EditRoleDto {
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  alias: string;
}
