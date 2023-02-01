import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'begin',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./ui/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'begin',
    loadChildren: () => import('./ui/pages/begin/begin.module').then( m => m.BeginPageModule)
  },
  {
    path: 'workspaces',
    loadChildren: () => import('./ui/pages/workspaces/workspaces.module').then( m => m.WorkspacesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./ui/pages/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
