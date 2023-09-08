import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateElictronicsProductsTable1694183365886
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE "categories" (
            "id" character varying NOT NULL,

            "brand" character varying(100) NOT NULL,
            "warranty" integer NOT NULL,
            "warranty_type" character varying NOT NULL,
            "long_product" integer  NOT NULL,
            "wide_product" integer  NOT NULL,
            "high_product" integer  NOT NULL,
            "weight" integer NOT NULL,

            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "created_by" character varying NOT NULL DEFAULT '1',
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_by" character varying NOT NULL DEFAULT '1',
            
            CONSTRAINT "PK_c6b7433fb1c0c8416b9ff907a3f" PRIMARY KEY ("id")
            );
            `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
