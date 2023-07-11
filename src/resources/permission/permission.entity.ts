import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CustomBaseEntity } from 'src/entities/base.entity';

@Entity('permission', { schema: 'mes' })
export class Permission extends CustomBaseEntity {
  @PrimaryColumn()
  @Column({ type: 'varchar', unique: true })
  name: string;

  @PrimaryColumn()
  @Column({ type: 'varchar', unique: true })
  alias: string;

  @Column({ type: 'int', comment: '所属权限组' })
  permission_group_id: number;
}
