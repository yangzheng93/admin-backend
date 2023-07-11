import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPermission1688701020827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO permission_group(name) VALUES ('部门'), ('用户')`,
    );

    await queryRunner.query(
      `INSERT INTO permission(name, alias, permission_group_id) VALUES ('部门编辑', 'EDIT_DEPARTMENT', 1), ('用户编辑', 'EDIT_USER', 2), ('重置密码', 'RESET_PASSWORD', 2)`,
    );

    await queryRunner.query(
      `INSERT INTO role_permission(role_id, permission_id) VALUES (1, 1), (1, 2), (1, 3)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
