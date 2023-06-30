import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'mes',
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/resources/**/*.entities.js'],
  synchronize: false,
});
