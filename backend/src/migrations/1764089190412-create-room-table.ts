import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoomTable1764089190412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `CREATE TABLE rooms (
    id BIGSERIAL PRIMARY KEY, 
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    active BOOLEAN DEFAULT TRUE
);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS rooms; `);
  }
}
