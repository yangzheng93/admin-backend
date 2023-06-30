import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from 'src/entities/base.entity';

@Entity('user_role', { schema: 'mes' })
export class UserRole extends CustomBaseEntity {
  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  role_id: number;
}
