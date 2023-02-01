import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import "./core/extras/prototype";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LoginRepository } from '@repositories/login';
import { UserRepository } from '@repositories/user';
import { WorkspaceRepository } from '@repositories/workspace';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "@components/components.module";
import { ApiProvider } from '@providers/api/api';
import { AuthenticationProvider } from '@providers/authentication/authentication';
import { HelperProvider } from '@providers/helper/helper';
import { HelperPedidoProvider } from '@providers/helper/helper-pedido';
import { LoginComunicationProvider } from '@providers/login-comunication/login-comunication.provider';
import { StorageProvider } from '@providers/storage/storage';
import { ThemeProvider } from "@providers/theme/theme";
import { OrmProvider } from './core/db/sqlite/typeorm/orm/orm';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule, 
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    UserRepository,
    LoginRepository,
    WorkspaceRepository,
    
    OrmProvider,
    ApiProvider,
    AuthenticationProvider,
    // HelperActiveModuleProvider,
    HelperPedidoProvider,
    HelperProvider,
    LoginComunicationProvider,
    StorageProvider,
    ThemeProvider,

    AppVersion
    
    
    

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
