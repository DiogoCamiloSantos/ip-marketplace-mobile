import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkspacesPage } from './workspaces.page';

const routes: Routes = [
  {
    path: '',
    component: WorkspacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspacesPageRoutingModule {}
