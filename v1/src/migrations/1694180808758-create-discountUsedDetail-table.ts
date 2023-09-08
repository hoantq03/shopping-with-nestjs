import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDiscountUsedDetailTable1694180808758
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE "discount_used_detail" (
            "id" character varying NOT NULL,

            "user_id" character varying NOT NULL,
            "discount_id" character varying NOT NULL,
            "order_id" character varying NOT NULL,
            
            "used_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "created_by" character varying NOT NULL DEFAULT '1',
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_by" character varying NOT NULL DEFAULT '1',
            
            CONSTRAINT "PK_a07fc6c90b841b9fb1c674333ff" PRIMARY KEY ("id"),
            CONSTRAINT "FK_c69f5fb437a70c3b1cf08416b9f" FOREIGN KEY ("user_id") REFERENCES users("id"),
            CONSTRAINT "FK_b9fc69f437a70c3b1cf085fb416" FOREIGN KEY ("discount_id") REFERENCES discounts("id"),
            CONSTRAINT "FK_c37a70cb9f3b85fb41669f41cf0" FOREIGN KEY ("order_id") REFERENCES orders("id")
            );
            `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
