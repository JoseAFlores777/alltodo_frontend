import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './errorPages/e404/e404.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: E404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
