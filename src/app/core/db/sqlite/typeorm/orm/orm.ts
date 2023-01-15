import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Workspace1673800646806 } from '@migrations/1673800646806-Workspace';
import "reflect-metadata";
import { Workspace } from 'src/app/core/db/sqlite/typeorm/entity/Workspace';
import { environment } from 'src/environments/environment';
import { DataSource, DataSourceOptions } from "typeorm";

export class OrmProvider {
  private dataSource: DataSource;

  constructor() {
  }
  
  async initialize(databaseName: string = environment.databaseName): Promise<SQLiteConnection>  {
    const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

    const options: DataSourceOptions = {
      type: 'capacitor',
      driver: sqliteConnection,
      database: databaseName,
      entities: [
        Workspace
      ],
      migrations: [
        Workspace1673800646806
      ],
      migrationsRun: false,
      synchronize: true,
      extra: {
        androidDatabaseImplementation: 2
      }
    }

    this.dataSource = new DataSource(options);
    
    await this.dataSource.initialize();    
    await this.dataSource.runMigrations({ transaction: 'all' });
    
    return sqliteConnection;
  }
}
