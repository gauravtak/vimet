import {
    MigrationInterface,
    QueryRunner,
    Table,
} from "typeorm";

export class CreateRoomTable1771746873538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
            new Table({
                name: "rooms",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "hostId",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "createdAt",
                        type: "timestamptz",
                        isNullable: false,
                        default: "now()",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamptz",
                        isNullable: false,
                        default: "now()",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rooms");
    }
}