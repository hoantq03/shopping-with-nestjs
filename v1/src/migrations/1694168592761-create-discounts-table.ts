import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDiscountsTable1694168592761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE "discounts" (
                "id" character varying NOT NULL,
    
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "type" character varying NOT NULL DEFAULT 'fixed_number', 
                "value" integer NOT NULL ,
                "code" character varying NOT NULL,
                "start_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "end_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now() + '7 days',
                "number_of_use" integer NOT NULL,
                "min_order_value" decimal NOT NULL,
                "status" character varying(100) NOT NULL,

                "user_id" character varying NOT NULL,

                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL DEFAULT '1',
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL DEFAULT '1',
                
                CONSTRAINT "PK_f907fc1c0ca3638474fb9fb316b" PRIMARY KEY ("id"),
                CONSTRAINT "FK_f67a98413fc643f1c0cb39fb07b" FOREIGN KEY ("user_id") REFERENCES users("id")
                );
                `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
