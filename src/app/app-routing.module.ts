import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./ui/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'begin',
    pathMatch: 'full'
  },
  {
    path: 'begin',
    loadChildren: () => import('./ui/pages/begin/begin.module').then( m => m.BeginPageModule)
  },
  {
    path: 'workspace',
    loadChildren: () => import('./ui/pages/workspace/workspace.module').then( m => m.WorkspacePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
