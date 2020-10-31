import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateTables implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          {
            isPrimary: true,
            name: 'id',
            type: 'int',
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
            onUpdate: 'now()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            charset: 'utf8mb4',
            collation: 'utf8mb4_unicode_ci',
          },
        ],
        engine: 'InnoDB',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('role');
  }
}
