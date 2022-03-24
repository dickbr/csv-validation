import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEntities1648145222203 implements MigrationInterface {
    name = 'CreateEntities1648145222203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "campaing"."file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaing"."contact_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_id" uuid NOT NULL, "phone" character varying NOT NULL, "message" character varying NOT NULL, "valid" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1476ca9a6265a586f618ea918fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "campaing"."contact_message" ADD CONSTRAINT "FK_896add7b9e7ec7c34434bf0a89d" FOREIGN KEY ("file_id") REFERENCES "campaing"."file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaing"."contact_message" DROP CONSTRAINT "FK_896add7b9e7ec7c34434bf0a89d"`);
        await queryRunner.query(`DROP TABLE "campaing"."contact_message"`);
        await queryRunner.query(`DROP TABLE "campaing"."file"`);
    }

}
