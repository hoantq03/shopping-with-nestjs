import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartDetailsTable1694168521169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE "cart_details" (
                "id" character varying NOT NULL,
    
                "cart_id" character varying NOT NULL,
                "product_id" character varying NOT NULL,
    
                "quantity" integer NOT NULL DEFAULT 0,
                "total_amount" decimal NOT NULL DEFAULT 0,
    
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL DEFAULT '1',
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL DEFAULT '1',
                
                CONSTRAINT "PK_a3674fb9fb1c0c84133f907fc6b" PRIMARY KEY ("id"),
                CONSTRAINT "FK_a3fc6f9fb07bf1c0cb984167433" FOREIGN KEY ("cart_id") REFERENCES carts("id"),
                CONSTRAINT "FK_a3fc6f9fb07bf17433c0cb98416" FOREIGN KEY ("product_id") REFERENCES products("id")
                );
                `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
