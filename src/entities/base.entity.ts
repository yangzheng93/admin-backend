import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CustomBaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number = null;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
