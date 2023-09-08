import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableOrders1689497232880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE "orders" (
            "id" character varying NOT NULL,

            "amount_total" decimal NOT NULL DEFAULT 0,
            "discount" decimal NOT NULL DEFAULT 0,
            "order_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "billDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "shipDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "status" character varying(100) NOT NULL,
            "tax" decimal NOT NULL DEFAULT 0,
            "ship_cost" decimal NOT NULL DEFAULT 0,

            "shipper_id" character varying,            
            "user_id" character varying NOT NULL,
            "voucher_id" character varying,
            
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "created_by" character varying NOT NULL DEFAULT '1',
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_by" character varying NOT NULL DEFAULT '1',
            
            CONSTRAINT "PK_a3ffb1c0c8416b97433f907fc6b" PRIMARY KEY ("id"),
            CONSTRAINT "FK_a70c3f5cfb18416b9fc6fb43907" FOREIGN KEY ("user_id") REFERENCES users("id"),
            CONSTRAINT "FK_a70c3f5cfb18416b9fc690fb437" FOREIGN KEY ("shipper_id") REFERENCES shippers("id")

            );
            `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
