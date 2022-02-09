import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InboxComponent } from './inbox/inbox.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { TodayComponent } from './today/today.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { TodoManageComponent } from './todo-manage/todo-manage.component';
import { ComponentsModule } from '../components/components.module';






@NgModule({
  declarations: [
    PagesComponent,
    ProfileComponent,
    DashboardComponent,
    InboxComponent,
    MyProjectsComponent,
    TodayComponent,
    UpcomingComponent,
    TodoManageComponent
  ],
  exports: [
    PagesComponent,
    ProfileComponent,
    DashboardComponent,
    InboxComponent,
    MyProjectsComponent,
    TodayComponent,
    UpcomingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    PrimeNgModule,
    ComponentsModule
    
    
  ]
})
export class PagesModule { }
