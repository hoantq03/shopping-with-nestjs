import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableOrderDetails1689496769580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE "orderDetails" (
            "orderDetailId" character varying NOT NULL,
            "orderId" character varying NOT NULL,
            "productId" character varying NOT NULL,
            "price" numeric(2,0) NOT NULL,
            "quantity" integer NOT NULL,
            "discount" numeric(2,0) NOT NULL,
            "total" numeric(2,0) NOT NULL,

            "shipDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "billDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "created_by" character varying NOT NULL DEFAULT '1',
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_by" character varying NOT NULL DEFAULT '1',
            
            CONSTRAINT "PK_a3ffc8416b1c0b97433f907fc6b" PRIMARY KEY ("orderDetailId"),
            CONSTRAINT "FK_a3f5cfb170c8416b9fc6fb43907" FOREIGN KEY ("orderId") REFERENCES orders("orderId"),
            CONSTRAINT "FK_a3fb416b35c6f907fb170c849fc" FOREIGN KEY ("productId") REFERENCES products("id")
            );
            `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
