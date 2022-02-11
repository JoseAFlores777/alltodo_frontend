import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AppRoutingModule } from '../app-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ProjectFormComponent } from '../forms/project-form/project-form.component';
import { FormsModule } from '../forms/forms.module';
import { DirectivesModule } from '../directives/directives.module';





@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbsComponent,
    
    
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    PrimeNgModule,
    FormsModule,
    DirectivesModule
  ]
})
export class SharedModule { }
