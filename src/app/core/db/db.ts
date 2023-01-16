import Dexie, { Table } from 'dexie';
import { Workspace } from '../models/Workspace';

export class AppDB extends Dexie {
  Workspaces!: Table<Workspace, number>;

  constructor() {
    super('ngdexieliveQuery');
    
    this.version(3).stores({
        Workspaces: '++id',
    });
  }
}

export const db = new AppDB();