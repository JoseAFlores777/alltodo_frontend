import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCheckDirective } from './todo-check.directive';



@NgModule({
  declarations: [
    TodoCheckDirective
  ],
  exports: [
    TodoCheckDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
