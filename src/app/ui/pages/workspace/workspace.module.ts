import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorkspacePage } from './workspace.page';
import { WorkspacePageRoutingModule } from './workspace-routing.module';

@NgModule({
  declarations: [
    WorkspacePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkspacePageRoutingModule
  ]
})
export class WorkspacePageModule {}
