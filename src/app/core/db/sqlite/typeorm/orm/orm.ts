import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { BaseBusinessCondition } from '@dbentities/BaseBusinessCondition';
import { ComboDeals } from "@dbentities/ComboDeals";
import { ComboDealsProducts } from '@dbentities/ComboDealsProducts';
import { Contents as Content } from '@dbentities/Content';
import { DeadlinePayment } from '@dbentities/DeadlinePayment';
import { DistributorsPaymentDeadline } from "@dbentities/DistributorsPaymentDeadline";
import { Filters } from '@dbentities/Filters';
import { MetricasMdtr } from '@dbentities/MetricasMdtr';
import { MixDistributors } from "@dbentities/MixDistributors";
import { MixDUNDistributors } from "@dbentities/MixDUNDistributors";
import { OrderTable } from "@dbentities/OrderTable";
import { PdvRelatedToShareOfShelfResearch } from "@dbentities/PdvRelatedToShareOfShelfResearch";
import { Permission } from "@dbentities/Permission";
import { Preference } from "@dbentities/Preference";
import { Product } from "@dbentities/Products";
import { ProductsBaseDiscount } from "@dbentities/ProductsBaseDiscount";
import { ProductsDUN as ProductDUN } from "@dbentities/ProductsDUN";
import { Research } from "@dbentities/Research";
import { ResearchComplementary } from "@dbentities/ResearchComplementary";
import { ResearchComplementaryResponse } from "@dbentities/ResearchComplementaryResponse";
import { ResearchField } from "@dbentities/ResearchField";
import { ResearchResponse } from "@dbentities/ResearchResponse";
import { ResearchShareOfShelf } from "@dbentities/ResearchShareOfShelf";
import { ResearchTradeMarketing } from "@dbentities/ResearchTradeMarketing";
import { ResearchWithStep } from "@dbentities/ResearchWithStep";
import { ResearchWithStepField } from '@dbentities/ResearchWithStepField';
import { ResearchWithStepResponse } from "@dbentities/ResearchWithStepResponse";
import { ShareOfShelf } from "@dbentities/ShareOfShelf";
import { Store } from '@dbentities/Store';
import { StoreRoute } from '@dbentities/StoreRoute';
import { Syncronization } from "@dbentities/Syncronization";
import { SystemParametrizations } from "@dbentities/SystemParametrizations";
import { Tabloid } from "@dbentities/Tabloid";
import { TabloidCombo } from "@dbentities/TabloidCombo";
import { TabloidDeadlinePayment } from "@dbentities/TabloidDeadlinePayment";
import { TabloidDistributor } from "@dbentities/TabloidDistributor";
import { TabloidSku } from "@dbentities/TabloidSku";
import { Theme } from '@dbentities/Theme';
import { User } from '@dbentities/User';
import { Visit } from "@dbentities/Visit";
import { Workspace } from '@dbentities/Workspace';
import { environment } from 'src/environments/environment';
import { DataSource, DataSourceOptions } from "typeorm";

export class OrmProvider {
  private dataSource: DataSource;
  private sqliteConnection: SQLiteConnection;
  
  constructor() {
    this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);
    
  }
  
  async initialize(databaseName: string = environment.databaseName): Promise<SQLiteConnection> {
console.log(this.sqliteConnection);

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
        SystemParametrizations, Tabloid, TabloidCombo, TabloidDeadlinePayment, TabloidDistributor, TabloidSku, Visit
      ],
      migrationsRun: false,
      synchronize: true,
      extra: {
        androidDatabaseImplementation: 2,
      },
    }    
    
    this.dataSource = new DataSource(options);
    await this.dataSource.initialize();    
    await this.dataSource.runMigrations({ transaction: 'all' });
    
    // console.clear(); 

    return this.sqliteConnection;
  }

  async getConnection(): Promise<DataSource> {
    return await this.dataSource;
  }  

  getConnectionAsync(): DataSource {
    return this.dataSource;
  }  

  async closeConnection(): Promise<void> {
    await this.sqliteConnection.closeConnection(this.dataSource.driver.database, false);
  }  
}
