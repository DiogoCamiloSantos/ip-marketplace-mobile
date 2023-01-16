import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeginPageRoutingModule } from './begin-routing.module';

import { BeginPage } from './begin.page';
import { WorkspacesService } from 'src/app/core/services/workspaces.service';
import { RemoteGatewayFactory } from 'src/app/core/gateways/remote-gateway-factory';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeginPageRoutingModule
  ],
  providers: [
  ],
  declarations: [BeginPage]
})
export class BeginPageModule {}
