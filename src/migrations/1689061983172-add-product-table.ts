import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductTable1689061983172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE TABLE "products" (
        "id" character varying NOT NULL,
        "name" character varying(100) NOT NULL,
        "description" character varying NOT NULL,
        "color" character varying(100) NOT NULL,
        "discount" real NOT NULL,
        "imageUrl" character varying(100) NOT NULL,
        "price" real NOT NULL,
        "categoryId" character varying NOT NULL,
        "userId" character varying NOT NULL,
        "quantityInStock" numeric NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "created_by" character varying NOT NULL DEFAULT '1',
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_by" character varying NOT NULL DEFAULT '1',
        
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6b7433f907" PRIMARY KEY ("id"),
        CONSTRAINT "FK_a3fb435cfb170c8416b9fc6f907" FOREIGN KEY ("categoryId") REFERENCES categories("categoryId"),
        CONSTRAINT "FK_a3fb435c6f907fb170c8416b9fc" FOREIGN KEY ("userId") REFERENCES users("id")
        );
        `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
