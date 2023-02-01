import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { WorkspacesPageRoutingModule } from './workspaces-routing.module';

import { WorkspacesPage } from './workspaces.page';
import { WorkspaceRepository } from '@repositories/workspace';
import { WorkspacesService } from '@services/workspaces';
import { ApiProvider } from '@providers/api/api';
import { HelperProvider } from '@providers/helper/helper';
import { StorageProvider } from '@providers/storage/storage';
import { AuthenticationProvider } from '@providers/authentication/authentication';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkspacesPageRoutingModule,
    ReactiveFormsModule,
    // HttpClientModule
  ],
  declarations: [WorkspacesPage],
  providers: [
    WorkspaceRepository,
    WorkspacesService,
    // ApiProvider, 
    // HelperProvider,
    StorageProvider,
    // AuthenticationProvider
  ]
})
export class WorkspacesPageModule {}
