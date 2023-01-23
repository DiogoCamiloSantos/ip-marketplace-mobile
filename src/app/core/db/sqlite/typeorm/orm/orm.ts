import "reflect-metadata";
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { User } from '@dbentities/User';
import { Store } from '@dbentities/Store';
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
import { ComboDeals } from "@dbentities/ComboDeals";
import { DistributorsPaymentDeadline } from "@dbentities/DistributorsPaymentDeadline";
import { MixDistributors } from "@dbentities/MixDistributors";
import { Product } from "@dbentities/Products";
import { ProductsBaseDiscount } from "@dbentities/ProductsBaseDiscount";
import { MixDUNDistributors } from "@dbentities/MixDUNDistributors";
import { Research } from "@dbentities/Research";
import { ResearchResponse } from "@dbentities/ResearchResponse";
import { ShareOfShelf } from "@dbentities/ShareOfShelf";
import { ResearchShareOfShelf } from "@dbentities/ResearchShareOfShelf";
import { PdvRelatedToShareOfShelfResearch } from "@dbentities/PdvRelatedToShareOfShelfResearch";
import { Permission } from "@dbentities/Permission";
import { Preference } from "@dbentities/Preference";
import { Syncronization } from "@dbentities/Syncronization";
import { ProductsDUN as ProductDUN } from "@dbentities/ProductsDUN";
import { OrderTable } from "@dbentities/OrderTable";
import { ResearchComplementary } from "@dbentities/ResearchComplementary";
import { ResearchComplementaryResponse } from "@dbentities/ResearchComplementaryResponse";
import { ResearchField } from "@dbentities/ResearchField";
import { ResearchTradeMarketing } from "@dbentities/ResearchTradeMarketing";
import { ResearchWithStep } from "@dbentities/ResearchWithStep";
import { ResearchWithStepResponse } from "@dbentities/ResearchWithStepResponse";

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
        Content, ComboDealsProducts, Filters, MetricasMdtr, DeadlinePayment,
        ComboDeals, DistributorsPaymentDeadline, MixDistributors, Product, ProductsBaseDiscount,
        MixDUNDistributors, Research, ResearchResponse, ShareOfShelf, ResearchShareOfShelf, PdvRelatedToShareOfShelfResearch,
        Permission, Preference, Syncronization, ProductDUN, OrderTable, ResearchComplementary, ResearchComplementaryResponse,
        ResearchField, ResearchTradeMarketing, ResearchWithStep, ResearchWithStepResponse,

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
    
    return this.sqliteConnection;
  }
}
