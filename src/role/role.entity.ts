import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from 'src/entities/base.entity';

@Entity('role', { schema: 'mes' })
export class Role extends CustomBaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number = null;

  @PrimaryColumn()
  @Column({ type: 'varchar', unique: true })
  name: string;

  // 系统默认角色别名
  @Column({ type: 'varchar', nullable: true, comment: '角色别名' })
  alias: string;
}
