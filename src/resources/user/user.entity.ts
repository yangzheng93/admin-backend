import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from 'src/entities/base.entity';

@Entity('user', { schema: 'mes' })
export class User extends CustomBaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: ['男', '女'], nullable: true })
  gender: '男' | '女';

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @PrimaryColumn()
  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'int', nullable: true })
  department_id: number;

  @Column({ type: 'varchar', default: '1' })
  is_actived: '0' | '1';
}
