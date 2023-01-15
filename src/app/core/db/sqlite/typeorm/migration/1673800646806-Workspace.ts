import { EntityEnum } from "@dbentities/EntityEnum";
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Workspace1673800646806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: EntityEnum.WORKSPACE,
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isGenerated: true,
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'workspaceId',
                    type: 'integer'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'link',
                    type: 'varchar'
                },
                {
                    name: 'token',
                    type: 'varchar'
                },
                {
                    name: 'active',
                    type: 'boolean'
                },
                {
                    name: 'deleted',
                    type: 'boolean',
                    default: 0
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
