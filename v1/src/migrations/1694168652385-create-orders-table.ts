import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersTable1694168652385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
  CREATE TABLE "orders" (
      "id" character varying NOT NULL,

      "total_amount" decimal NOT NULL DEFAULT 0,
      "order_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "bill_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "status" character varying(100) NOT NULL,
      "ship_cost" decimal NOT NULL DEFAULT 0,
      
      "shipper_id" character varying,            
      "user_id" character varying NOT NULL,
      "discount_id" character varying,
      "address_id" character varying NOT NULL,

      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "created_by" character varying NOT NULL DEFAULT '1',
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updated_by" character varying NOT NULL DEFAULT '1',
      
      CONSTRAINT "PK_a3ffb1c0c8416b97433f907fc6b" PRIMARY KEY ("id"),
      CONSTRAINT "FK_a70c3f5cfb18416b9fc6fb43907" FOREIGN KEY ("user_id") REFERENCES users("id"),
      CONSTRAINT "FK_a70c3f5cfb18416b9fc690fb437" FOREIGN KEY ("shipper_id") REFERENCES shippers("id"),
      CONSTRAINT "FK_f5cf0fb437a70c3b18416b9fc69" FOREIGN KEY ("discount_id") REFERENCES discounts("id"),
      CONSTRAINT "FK_f5cf0f7016bb437a9fc69c3b184" FOREIGN KEY ("address_id") REFERENCES addresses("id")

      );
      `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
