import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { User } from '@dbentities/User';
import { Store } from '@dbentities/Store';
import "reflect-metadata";
import { Workspace } from 'src/app/core/db/sqlite/typeorm/entity/Workspace';
import { environment } from 'src/environments/environment';
import { DataSource, DataSourceOptions } from "typeorm";
import { ResearchWithStepField } from '@dbentities/ResearchWithStepField';
import { StoreRoute } from '@dbentities/StoreRoute';
import { BaseBusinessCondition } from '@dbentities/BaseBusinessCondition';
import { Theme } from '@dbentities/Theme';
import { Contents as Content } from '@dbentities/Content';
import { ComboDealsProducts } from '@dbentities/ComboDealsProducts';
import { Filters } from '@dbentities/Filters';
import { MetricasMdtr } from '@dbentities/MetricasMdtr';
import { DeadlinePayment } from '@dbentities/DeadlinePayment';

export class OrmProvider {
  private dataSource: DataSource;
  private sqliteConnection = new SQLiteConnection(CapacitorSQLite);
  
  constructor() {
    this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);
  }
  
  async initialize(databaseName: string = environment.databaseName): Promise<SQLiteConnection> {
    const options: DataSourceOptions = {
      type: 'capacitor',
      driver: this.sqliteConnection,
      database: databaseName,
      entities: [
        Store, User, Workspace, ResearchWithStepField, StoreRoute, BaseBusinessCondition, Theme,
        Content, ComboDealsProducts, Filters, MetricasMdtr, DeadlinePayment
      ],
      migrationsRun: false,
      synchronize: true,
      extra: {
        androidDatabaseImplementation: 2,
      }
    }

    this.dataSource = new DataSource(options);
    
    await this.dataSource.initialize();    
    await this.dataSource.runMigrations({ transaction: 'all' });

    console.log((await this.dataSource.manager.getRepository(Workspace)
    .createQueryBuilder('wrk')
    .innerJoinAndSelect('wrk.stores', 'stores')
    .where('wrk.id = :workspaceId', {workspaceId: 1})
    .getMany())
    );    
    
    return this.sqliteConnection;
  }
}
