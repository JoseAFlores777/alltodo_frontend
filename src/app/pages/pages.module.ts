import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';



@NgModule({
  declarations: [
    PagesComponent,
    ProfileComponent
  ],
  exports: [
    PagesComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
