import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddressTable1688958021742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE addresses_info (
        "address_id" character varying NOT NULL,
        "user_id" character varying NOT NULL,
        "address_line" character varying NOT NULL,
        "city" character varying NOT NULL,
        "postal_code" character varying NOT NULL,
        "country" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "created_by" character varying NOT NULL DEFAULT '1',
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_by" character varying NOT NULL DEFAULT '1',
        
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7434" PRIMARY KEY ("address_id"),
        CONSTRAINT "FK_a3ffb17435c0c8416b9fc6f907b" FOREIGN KEY ("user_id") REFERENCES users("user_id")
    )
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
