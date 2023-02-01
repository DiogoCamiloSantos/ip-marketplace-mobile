import { Injectable } from '@angular/core';
import { StackError } from '@models/erros';
import { AuthenticationProvider } from '@providers/authentication/authentication';
import { DataSource, In, Not, Repository } from 'typeorm';
import { Workspace } from '../typeorm/entity/Workspace';
import { OrmProvider } from '../typeorm/orm/orm';

@Injectable()
export class WorkspaceRepository {
    private connection: DataSource;
    private repository: Repository<Workspace>;

    constructor(
        public orm: OrmProvider,
        public auth: AuthenticationProvider
    ) {        

    }

    private async initRepository() {
        if (!!this.connection && this.repository)
            return;

        this.connection = await this.orm.getConnection();
        this.repository = await this.connection.getRepository(Workspace);

        await this.connection.manager.query('PRAGMA journal_mode = MEMORY');
        await this.connection.manager.query('PRAGMA synchronous = OFF');
    }

    public async alter(workspace: Workspace): Promise<any> {
        await this.initRepository();

        try {
            return this
                .repository
                .update(workspace.id, workspace);
        } catch (error) {
            Promise.reject(error);
        }
    }

    public async getAll(): Promise<Workspace[]> {
        try {
            await this.initRepository();

            return this.connection.manager.createQueryBuilder(Workspace, "workspace").select()
                .where("workspace.deleted = :deleted", { deleted: false })
                .getMany();

        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async getOneById(id: number): Promise<Workspace> {
        try {
            await this.initRepository();

            return this.repository.findOne({
                where: {
                    id
                }
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }


    public async getOneByWorkspaceId(workspaceId: number): Promise<Workspace> {
        try {
            await this.initRepository();

            return this.repository.findOne({
                where: {
                    workspaceId
                }
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async updateDeleteByIds(workspaces: number[] | null) {
        try {
            if (workspaces === null || workspaces.length === 0) {
                return Promise.resolve();
            }

            await this.initRepository();

            await this.connection.manager.query('PRAGMA journal_mode = MEMORY');
            await this.connection.manager.query('PRAGMA synchronous = OFF');

            const execute = this.connection
                .getRepository(Workspace)
                .createQueryBuilder('workspace')
                .update()
                .set({
                    deleted: true
                })
                .where({
                    workspaceId: Not(In(workspaces))
                })
                .execute();

            return execute;

        } catch (error) {
            console.error('ERRO ao excluir workspace > ', error);
            throw new StackError('Erro ao tentar sincronizar workspace.');
        }
    }

    public async updateDelete() {
        try {
            await this.initRepository();

            await this.connection.manager.query("PRAGMA journal_mode = MEMORY");

            const execute = this.connection
                .getRepository(Workspace)
                .createQueryBuilder("workspace")
                .update()
                .set({
                    deleted: true
                })
                .execute();

            return execute;
        } catch (error) {
            console.error("ERRO ao excluir workspace > ", error);
            throw new StackError("Erro ao tentar sincronizar workspace.");
        }
    }

    public async deleteAll() {
        try {
            await this.initRepository();

            await this.connection.manager.query("PRAGMA foreign_keys = OFF");
            await this.connection.manager.query("PRAGMA journal_mode = MEMORY");

            return this.connection
                .getRepository(Workspace)
                .createQueryBuilder("workspace")
                .delete()
                .where("deleted = :deleted", { deleted: true })
                .execute();
        } catch (error) {
            console.error("ERRO ao excluir workspace > ", error);
            throw new StackError("Erro ao tentar sincronizar workspace.");
        }
    }

    public async saveWorkspace(item: Workspace): Promise<any> {
        try {
            await this.initRepository();

            await this.connection.manager.query("PRAGMA journal_mode = MEMORY");

            const repository = this.connection.getRepository(Workspace);

            const workspaceFindedPromise = repository.findOne({
                where: {
                    workspaceId: item.workspaceId
                }
            });

            return workspaceFindedPromise.then(workspaceFinded => {
                let workspaceToSave = workspaceFinded
                    ? workspaceFinded
                    : new Workspace();

                workspaceToSave.name = item.name;
                workspaceToSave.link = item.link;
                workspaceToSave.workspaceId = item.workspaceId;
                workspaceToSave.token = item.token;
                workspaceToSave.deleted = false;

                if (!workspaceFinded) {
                    workspaceToSave.active = false;
                }

                return repository.save(workspaceToSave).then(item => {
                    if (
                        this.auth.workspace &&
                        item.workspaceId === this.auth.workspace.workspaceId
                    ) {
                        this.auth.workspace = {
                            ...this.auth.workspace,
                            name: item.name,
                            link: item.link,
                            token: item.token
                        };
                    }

                    return item;
                });
            });
        } catch (error) {
            console.error(error);
            throw new StackError("Erro ao tentar sincronizar Workspaces.");
        }
    }
}
