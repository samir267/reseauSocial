import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_DB_HOST,
  port:+process.env.TYPEORM_DB_PORT,
  username: process.env.TYPEORM_DB_USERNAME,
  password: process.env.TYPEORM_DB_PASSWORD, 
  database: process.env.TYPEORM_DB_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
