import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDepartment1688371502068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO department(name) VALUES ('财务部'), ('销售部')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM department WHERE name='财务部' OR name='销售部'`,
    );
  }
}
