import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnNameToRoomTable1772873215164 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "rooms",
      new TableColumn({
        name: "name",
        type: "varchar",
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("rooms", "name");
  }
}
