import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TodoTypeView } from '../../models/TodoTypeView';
import { Project } from '../../models/project.model';


@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.css']
})
export class TodoManageComponent implements OnInit {

  @ViewChild('btnProject') btnProject!: ElementRef;
  @ViewChild('btnSchedule') btnSchedule!: ElementRef;

  @Input() todoTypeView!: TodoTypeView;
  @Input() currentProject!: Project;
  @Input() color!: string;

  visibilityTodoDialog: boolean = false;



  constructor() { }

  ngOnInit(): void {
  }

  hideAddTodoDialog() {
    this.visibilityTodoDialog = false;
  }

  showAddTodoDialog() {
    this.visibilityTodoDialog = true;
  }


}
