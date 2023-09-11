import { DataSource } from 'typeorm';
import {
  CreateAddressesTable1694166999572,
  CreateCartDetailsTable1694168521169,
  CreateCartsTable1694166821871,
  CreateDiscountUsedDetailTable1694180808758,
  CreateDiscountsTable1694168592761,
  CreateElictronicsProductsTable1694183365886,
  CreateInventoriesTable1694181294315,
  CreateOrderDetailsTable1694225557323,
  CreateOrdersTable1694168652385,
  CreateProductsTable1694167041002,
  CreateShippersTable1694168679564,
  CreateUsersTable1694166962924,
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
    CreateCartsTable1694166821871,
    CreateUsersTable1694166962924,
    CreateAddressesTable1694166999572,
    CreateProductsTable1694167041002,
    CreateCartDetailsTable1694168521169,
    CreateDiscountsTable1694168592761,
    CreateShippersTable1694168679564,
    CreateOrdersTable1694168652385,
    CreateDiscountUsedDetailTable1694180808758,
    CreateInventoriesTable1694181294315,
    CreateElictronicsProductsTable1694183365886,
    CreateOrderDetailsTable1694225557323,
  ],
});
