import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRoomParticipantTable1772874686738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "roomParticipants",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "roomId",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "participantId",
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("roomParticipants");
  }
}
