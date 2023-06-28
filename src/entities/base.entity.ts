import { CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';

export abstract class CustomBaseEntity {
  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
