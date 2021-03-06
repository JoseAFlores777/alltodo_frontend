import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { InboxComponent } from './inbox/inbox.component';
import { TodayComponent } from './today/today.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { TodoManageComponent } from './todo-manage/todo-manage.component';
import { TomorrowComponent } from './tomorrow/tomorrow.component';
import { ReportsComponent } from './reports/reports.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  {path: 'profile', component: ProfileComponent, data: { title: 'My Profile' }},
  {path: 'inbox', component: InboxComponent, data: { title: 'Inbox' }},
  {path: 'today', component: TodayComponent, data: { title: 'Today' }},
  {path: 'tomorrow', component: TomorrowComponent, data: { title: 'Tomorrow' }},
  {path: 'upcoming', component: UpcomingComponent, data: { title: 'Upcoming' }},
  {path: 'my-projects/:id', component: MyProjectsComponent, data: { title: 'My Projects' }},
  {path: 'reports', component: ReportsComponent, data: { title: 'Reports' }},
  
]

@NgModule({
  declarations: [
    
  ],
  imports: [RouterModule.forChild(childRoutes),PrimeNgModule],
  exports:[RouterModule]
})
export class ChildRoutesModule { }
