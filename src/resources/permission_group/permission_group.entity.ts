import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CustomBaseEntity } from 'src/entities/base.entity';

@Entity('permission_group', { schema: 'mes' })
export class PermissionGroup extends CustomBaseEntity {
  @PrimaryColumn()
  @Column({ type: 'varchar', unique: true, comment: '权限组名称' })
  name: string;
}
