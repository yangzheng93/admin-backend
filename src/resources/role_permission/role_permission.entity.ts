import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from 'src/entities/base.entity';

@Entity('role_permission', { schema: 'mes' })
export class RolePermission extends CustomBaseEntity {
  @Column({ type: 'int' })
  role_id: number;

  @Column({ type: 'int' })
  permission_id: number;
}
