import { DataSource } from 'typeorm';
import {
  CreateUser1687788815349,
  AddRoleColumn1688870468614,
  AddressTable1688958021742,
  AddCategoryTable1689062464491,
  AddProductTable1689061983172,
} from '../migrations';

export default new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  migrations: [
    CreateUser1687788815349,
    AddRoleColumn1688870468614,
    AddressTable1688958021742,
    AddCategoryTable1689062464491,
    AddProductTable1689061983172,
  ],
});
