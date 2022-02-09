import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.css']
})
export class TodoManageComponent implements OnInit {

  @Input() Title_forTodo!: string;
  @Input() Title_completed!: string;

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
