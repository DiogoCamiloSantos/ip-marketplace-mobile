import { Injectable } from '@angular/core';
import { User } from '@dbentities/User';
import { Workspace } from '@dbentities/Workspace';
import { StorageEnum } from '@models/enum';
import { LoginResponse } from '@models/login';
import { StorageProvider } from '@providers/storage/storage';
import { UserRepository } from './user';
import { WorkspaceRepository } from './workspace';

@Injectable()
export class LoginRepository {
    constructor(
        private storage: StorageProvider,
        private userRepository: UserRepository,
        private workspaceRepository: WorkspaceRepository
    ) { }

    public async saveUserWorkspace(user: LoginResponse, pass: string, username: string): Promise<{userId: number, workspaceId: number}> {
        let workspace = this.storage.get<Workspace>(StorageEnum.WORKSPACE);
        
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + user.expires_in);

        let userToSave = new User();
        
        const userSearched: User = await this.userRepository.findOneByUserId(user.UserId);

        if (userSearched) {
            userToSave = userSearched;
        }

        userToSave.lastActive = new Date();
        userToSave.name = user.Nome;
        userToSave.password = pass;
        userToSave.expires_in = expiresAt;
        userToSave.perfil = user.Perfil;
        userToSave.perfilId = user.PerfilId;
        userToSave.userId = user.UserId;
        userToSave.last_token = user.access_token;
        userToSave.username = username;

        const userSaved = await this.userRepository.save(userToSave);

        this.storage.set(StorageEnum.AUTH, userSaved);

        workspace.active = true;
        workspace.user = userSaved;

        await this.workspaceRepository.alter(workspace);

        return { userId: userSaved.id, workspaceId: workspace.id };
    }
}