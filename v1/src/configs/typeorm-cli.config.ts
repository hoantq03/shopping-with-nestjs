import { DataSource } from 'typeorm';
import {
  AddCategoryTable1689062464491,
  AddProductTable1689061983172,
  AddTableCart1689740834829,
  AddTableCartItems1689743971067,
  AddTableOrderDetails1689496769580,
  AddTableOrders1689497232880,
  AddTableShippers1689498492375,
  AddressTable1688958021742,
  CreateUser1687788815349,
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
    AddTableCart1689740834829,
    CreateUser1687788815349,
    AddressTable1688958021742,
    AddCategoryTable1689062464491,
    AddProductTable1689061983172,
    AddTableShippers1689498492375,
    AddTableOrders1689497232880,
    AddTableOrderDetails1689496769580,
    AddTableCartItems1689743971067,
  ],
});