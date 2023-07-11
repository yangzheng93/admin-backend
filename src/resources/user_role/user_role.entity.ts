import { Column, Entity, Index } from 'typeorm';
import { CustomBaseEntity } from 'src/entities/base.entity';

@Entity('user_role', { schema: 'mes' })
@Index(['user_id', 'role_id'], { unique: true })
export class UserRole extends CustomBaseEntity {
  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  role_id: number;
}
