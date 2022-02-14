import { Component, OnInit, DoCheck } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Project } from 'src/app/models/project.model';
import { Todo } from 'src/app/models/todo.model';
import { ProjectService } from 'src/app/services/project.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ReportsComponent implements OnInit, DoCheck {

  todos: Todo[] = [];
  projects: Project[] = [];
  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private projectService: ProjectService,
    private todoService: TodoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

    this.chargeProjects();
    this.chargeTodos();

   }
  ngDoCheck(): void {
    this.todos = this.todoService.todos;
    this.projects = this.projectService.projects;
  }

  ngOnInit(): void {

    this.todos = this.todoService.todos;
    this.projects = this.projectService.projects;

  }

  chargeProjects() {
    this.projectService.chargeProjects().subscribe();
  }

  chargeTodos() {
    this.todoService.chargeTodos().subscribe();
  }

  clear(table: Table) {
    table.clear();
}


}
