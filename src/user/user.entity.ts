import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Gender {
  MEN = '男',
  WOMEN = '女',
}

@Entity('user', { schema: 'mes' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number = null;

  @Column('varchar', { nullable: false })
  name: string;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'int' })
  department_id: number;

  @CreateDateColumn({ default: new Date() })
  created_at: Date;

  @UpdateDateColumn({ default: new Date() })
  updated_at: Date;
}
