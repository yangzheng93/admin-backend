import { MigrationInterface, QueryRunner } from 'typeorm';
import { MD5 } from 'crypto-js';

export class InitData1687943582177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const p = MD5('888888');

    await queryRunner.query(
      `INSERT INTO role(name, alias) VALUES ('系统管理员', 'ADMIN'), ('部门负责人', 'LEADER')`,
    );

    await queryRunner.query(
      `INSERT INTO user(name, gender, phone, password, is_actived) VALUES ('杨政', '男', '18721393486', '${p}', '1')`,
    );

    await queryRunner.query(
      `INSERT INTO user_role(user_id, role_id) VALUES ('1', '1')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM role WHERE name='系统管理员' OR name='部门负责人'`,
    );

    await queryRunner.query(`DELETE FROM user WHERE phone='18721393486'`);

    await queryRunner.query(
      `DELETE FROM user_role WHERE user_id='1' AND role_id='1'`,
    );
  }
}
