import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ProgressBarLoaderComponent } from './loader/progress-bar-loader/progress-bar-loader.component';



@NgModule({
  declarations: [
    ProgressBarLoaderComponent
  ],
  exports: [
    ProgressBarLoaderComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ]
})
export class ComponentsModule { }
