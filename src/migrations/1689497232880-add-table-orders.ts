import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableOrders1689497232880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE "orders" (
            "orderId" character varying NOT NULL,
            "userId" character varying NOT NULL,
            "shipperId" character varying NOT NULL,            
            "orderDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            
            
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "created_by" character varying NOT NULL DEFAULT '1',
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_by" character varying NOT NULL DEFAULT '1',
            
            CONSTRAINT "PK_a3ffb1c0c8416b97433f907fc6b" PRIMARY KEY ("orderId"),
            CONSTRAINT "FK_a70c3f5cfb18416b9fc6fb43907" FOREIGN KEY ("userId") REFERENCES users("id"),
            CONSTRAINT "FK_a70c3f5cfb18416b9fc690fb437" FOREIGN KEY ("shipperId") REFERENCES shipper("shipperId"),

            );
            `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
