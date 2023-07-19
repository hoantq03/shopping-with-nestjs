import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductTable1689061983172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE TABLE "products" (
        "product_id" character varying NOT NULL,
        "name" character varying(100) NOT NULL,
        "description" character varying NOT NULL,
        "color" character varying(100) NOT NULL,
        "discount" decimal NOT NULL DEFAULT 0,
        "imageUrl" character varying(100) NOT NULL ,
        "price" decimal NOT NULL DEFAULT 0,
        "stock" integer NOT NULL DEFAULT 0,

        "category_id" character varying NOT NULL,
        "user_id" character varying NOT NULL,
        
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "created_by" character varying NOT NULL DEFAULT '1',
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_by" character varying NOT NULL DEFAULT '1',
        
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6b7433f907" PRIMARY KEY ("product_id"),
        CONSTRAINT "FK_a3fb435cfb170c8416b9fc6f907" FOREIGN KEY ("category_id") REFERENCES categories("category_id"),
        CONSTRAINT "FK_a3fb435c6f907fb170c8416b9fc" FOREIGN KEY ("user_id") REFERENCES users("user_id")
        );
        `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
