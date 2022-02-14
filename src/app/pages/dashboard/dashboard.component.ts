import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Project } from 'src/app/models/project.model';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class DashboardComponent implements OnInit {

  todos: Todo[] = [];
  projects: Project[] = [];


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


  getTotalTodos() { 
    return this.todoService.todos.length;
  }

  getTotalProjects() { 
    return this.projectService.projects.length;
  }

  getTotalTodosCompleted() { 
    return this.todoService.todos.filter(todo => todo.completed).length;
  }

  getTotalTodosPending() { 
    return this.todoService.todos.filter(todo => !todo.completed).length;
  }

  getTotalTodosByProject(id: string) { 
    
    let todos_tmp = this.todoService.todos.filter((todo) => {
      return todo.project != null;
    });

    todos_tmp = todos_tmp.filter((todo) => {
      return todo.project.id == id;
    });
    return todos_tmp.length;
  }

  getTotalTodosCompletedByProject(id: string) { 
    
    let todos_tmp = this.todoService.todos.filter((todo) => {
      return todo.project != null;
    });

    todos_tmp = todos_tmp.filter((todo) => {
      return todo.project.id == id && todo.completed;
    });
    return todos_tmp.length;
  }

  getTotalTodosPendingByProject(id: string) { 
    
    let todos_tmp = this.todoService.todos.filter((todo) => {
      return todo.project != null;
    });

    todos_tmp = todos_tmp.filter((todo) => {
      return todo.project.id == id && !todo.completed;
    });
    return todos_tmp.length;
  }

}