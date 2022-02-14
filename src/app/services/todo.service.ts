import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { TodoForm } from '../interfaces/forms.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todos!: Todo[];
  

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  chargeTodos() {
    return this.http.get(`${base_url}/todos`, this.authService.headers)
      .pipe(
        tap((todos: any) => { 
          
          this.todos = todos; 
        })
      )
  }

  createTodo(formData: TodoForm) {
    return this.http.post(`${base_url}/todos`, formData, this.authService.headers);
  }

  updateTodo(id: string, formData: TodoForm) { 
    return this.http.put(`${base_url}/todos/${id}`, formData, this.authService.headers);
  }

  deleteTodo(id: string) { 
    return this.http.delete(`${base_url}/todos/${id}`, this.authService.headers);
  }

  updateTodoStatus(id: string, formData: any) {
    
    return this.http.put(`${base_url}/status/todo/${id}`, formData, this.authService.headers);
  }













}
