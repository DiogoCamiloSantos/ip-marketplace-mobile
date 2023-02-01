import { Injectable } from '@angular/core';
import { StorageEnum } from '@models/enum';
import { WorkspaceUserSync } from '@models/login';
import { StorageProvider } from '@providers/storage/storage';

@Injectable()
export class LoginRulesService {
    constructor(
        private storage: StorageProvider
    ) { }

    public saveUserSync(workspaceUserSet: WorkspaceUserSync): Promise<boolean> {
        const keySyncSave = `${workspaceUserSet.userId}-${workspaceUserSet.workspaceId}-${StorageEnum.SYNC}`;

        if (this.storage.has(keySyncSave)) {
            return Promise.resolve(false);
        } else {
            this.storage.setSync(keySyncSave, workspaceUserSet);
            return Promise.resolve(true);
        }
    }
}