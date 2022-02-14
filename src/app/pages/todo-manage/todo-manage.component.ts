import { Component, ElementRef, Input, OnInit, ViewChild, DoCheck } from '@angular/core';
import { TodoTypeView } from '../../models/TodoTypeView';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import { element } from 'protractor';
import { OverlayPanel } from 'primeng/overlaypanel';
import { timeType_Enum, actionType_Enum, TypeView_Enum } from '../../models/enums';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { title } from 'process';


@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.css'],
  providers: [ConfirmationService, MessageService, DatePipe],
})
export class TodoManageComponent implements OnInit, DoCheck {
  @ViewChild('scheduleCalendar') scheduleCalendar!: ElementRef;
  @ViewChild('op2') op2!: ElementRef;
  @ViewChild('btnProject') btnProject!: ElementRef;
  @ViewChild('btnSchedule') btnSchedule!: ElementRef;
  @ViewChild('TodoList') TodoList!: ElementRef;

  @Input() todoTypeView!: TodoTypeView;
  @Input() currentProject!: Project;
  @Input() color!: string;

  visibilityTodoDialog: boolean = false;
  idDialogScheduleHide: boolean = true;

  action!: string;
  schedule_tmp!: Date | null;
  projects!: Project[];
  todos: Todo[] = [];
  selectedProject!: Project | null;
  currentTodo!: Todo;

  minDate: string | null = this.dateToStringFormat(
    new Date(),
    'yyyy-MM-ddThh:mm'
  );

  timeTypes = {
    TODAY: timeType_Enum.TODAY,
    TOMORROW: timeType_Enum.TOMORROW,
    NEXT_WEEK: timeType_Enum.NEXT_WEEK,
  };

  todoSaveForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    project: [null],
    completed: [false],
    expirationDate: [new Date(), Validators.required],
  });

  constructor(
    public datepipe: DatePipe,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private todoService: TodoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.chargeProjects();
    this.chargeTodos();
  }

  ngDoCheck(): void {
    this.projects = this.projectService.projects;
    //this.todos = this.todoService.todos;
    this.todoDataFilterController(this.todoService.todos);
  }

  ngOnInit(): void {}

  chargeProjects() {
    this.projectService.chargeProjects().subscribe();
  }

  chargeTodos() {
    this.todoService.chargeTodos().subscribe();
  }


  isValidInput(inputName: string) {
    return (
      this.todoSaveForm.controls[inputName].errors &&
      this.todoSaveForm.controls[inputName].touched
    );
  }

  hideAddTodoDialog() {
    this.TodoList.nativeElement.style.display = 'block';
    this.visibilityTodoDialog = false;
    this.selectedProject = null;
    this.schedule_tmp = null;
    this.todoSaveForm.reset();
  }

  showAddTodoDialog() {
    this.TodoList.nativeElement.style.display = 'none';
    this.action = actionType_Enum.CREATE;
    this.visibilityTodoDialog = true;

    if (this.todoTypeView.TypeView == TypeView_Enum.PROJECTS) {
      this.selectedProject = this.currentProject;
    }
    if (this.todoTypeView.TypeView == TypeView_Enum.TODAY) {
      this.schedule_tmp = new Date(); 
    }
    if (this.todoTypeView.TypeView == TypeView_Enum.TOMORROW) {
      let today = new Date();
      let date2 = new Date(today);
      date2.setDate(date2.getDate() + 1);
      this.schedule_tmp = date2;
    }

  }

  showEditTodoDialog(todo: Todo) {
    this.TodoList.nativeElement.style.display = 'none';
    this.action = actionType_Enum.UPDATE;
    this.schedule_tmp = new Date(todo.expirationDate);
    this.visibilityTodoDialog = true;
    this.todoSaveForm.controls['title'].setValue(todo.title);
    this.todoSaveForm.controls['description'].setValue(todo.description);
    this.todoSaveForm.controls['expirationDate'].setValue( this.schedule_tmp.toISOString());
    // this.btnSchedule.nativeElement.label = this.dateToStringFormat(todo.expirationDate, 'MMM d, E');
    this.currentTodo = todo;

    if (todo.project != null) {
      this.todoSaveForm.controls['project'].setValue(todo.project.id);
      this.selectedProject = todo.project;
    } else {
      this.selectedProject = null;
      this.btnProject.nativeElement.style.color = 'rgba(0, 0, 0, 0.6)';
      // console.log(this.selectedProject);
    }
  }

  onShowScheduleDialog() {
    this.schedule_tmp = this.scheduleCalendar.nativeElement.value;
  }

  dateToStringFormat(date: Date, format: string) {
    return this.datepipe.transform(date, format);
  }

  getDateScheduleFormated() {
    return this.dateToStringFormat(this.schedule_tmp!, 'MMM dd, E');
  }

  manageTodo() {
    if (this.action == actionType_Enum.CREATE) {
      this.createTodo();
    }

    if (this.action == actionType_Enum.UPDATE) {
      this.updateTodo(this.currentTodo.id);
    }
  }

  createTodo() {

    if (this.todoSaveForm.invalid) {
      this.todoSaveForm.markAllAsTouched();
      return;
    }


    if (this.selectedProject != null) {
      this.todoSaveForm.controls['project'].setValue(this.selectedProject);
    }
    if (this.schedule_tmp != null) {
      this.todoSaveForm.controls['expirationDate'].setValue(this.schedule_tmp.toISOString());
    }

    this.todoSaveForm.controls['completed'].setValue(false);

    this.todoService.createTodo(this.todoSaveForm.value).subscribe(
      (response) => {
        this.todoService.chargeTodos().subscribe();
        Swal.fire('Great!', 'Successfully created', 'success');
        this.hideAddTodoDialog();
      },
      (err) => {
        Swal.fire('something goes wrong!', err.error, 'error');
      }
    );
  }

  updateTodo(id: string) {

    if (this.todoSaveForm.invalid) {
      this.todoSaveForm.markAllAsTouched();
      return;
    }

    if (this.selectedProject != null) {
      this.todoSaveForm.controls['project'].setValue(this.selectedProject);
    }
    if (this.schedule_tmp != null) {
      this.todoSaveForm.controls['expirationDate'].setValue(this.schedule_tmp);
    }

    // console.log(this.todoSaveForm.value);

    this.todoService.updateTodo(id, this.todoSaveForm.value).subscribe(
      (response) => {
        this.hideAddTodoDialog();
        this.todoService.chargeTodos().subscribe();
        Swal.fire('Great!', 'Successfully updated', 'success');
      },
      (err) => {
        Swal.fire('something goes wrong!', err.error, 'error');
      }
    );
  }

  onRowSelect(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Selected',
      detail: event.data.name,
    });
  }

  setTimeByButtons(time: string, element: OverlayPanel) {
    this.printTimeInForm(time);
    element.hide();
  }



  printTimeInForm(time: string) {
    let today = new Date();
    let date2 = new Date(today);

    if (time == timeType_Enum.TODAY || time == TypeView_Enum.TODAY) {
      this.scheduleCalendar.nativeElement.value = this.dateToStringFormat(
        today,
        'yyyy-MM-ddThh:mm'
      );
    }
    if (time == timeType_Enum.TOMORROW) {
      date2.setDate(date2.getDate() + 1);
      this.scheduleCalendar.nativeElement.value = this.dateToStringFormat(
        date2,
        'yyyy-MM-ddThh:mm'
      );
    }
    if (time == timeType_Enum.NEXT_WEEK || time == TypeView_Enum.UPCOMING) {
      date2.setDate(date2.getDate() + 7);
      this.scheduleCalendar.nativeElement.value = this.dateToStringFormat(
        date2,
        'yyyy-MM-ddThh:mm'
      );
    }
  }

  // ToDo Part

  confirmDeleteTodo(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event!.target!,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTodo(id);
      },
      reject: () => {
        //reject action
      },
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(
      (response) => {
        this.todoService.chargeTodos().subscribe();
        Swal.fire('Great!', 'Successfully deleted', 'success');
      },
      (err) => {
        Swal.fire('something goes wrong!', err.error, 'error');
      }
    );
  }

  updateTodoStatus(todo: Todo, event: any) {
    // console.log(todo.title, event.target!.checked);
    // console.log(event.path[2]);

    // setTimeout(function(){
    //   event.path[2].style.display = 'none';
    // },500);

    let StatusData = {
      completed: event.target!.checked,
    };

    this.todoService.updateTodoStatus(todo.id, StatusData).subscribe(
      (response) => {
        this.todoService.chargeTodos().subscribe();
      },
      (err) => {
        Swal.fire('something goes wrong!', err.error, 'error');
      }
    );
  }




  todoDataFilterController(todos: Todo[]): any {
    let today = new Date();
    switch (this.todoTypeView.TypeView) {

      case TypeView_Enum.INBOX:
        this.todos = todos;
        break;
      
      
      case TypeView_Enum.TODAY:
        
        this.todos = todos.filter((todo) => {
          let date = new Date(todo.expirationDate);
          return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
        });
        break;
      
      case TypeView_Enum.TOMORROW:
        this.todos = todos.filter((todo) => {
          let date = new Date(todo.expirationDate);
          return date.getDate() == today.getDate()+1 && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
        });
        break;
      
      
      case TypeView_Enum.UPCOMING:
        this.todos = todos.filter((todo) => {
          let date = new Date(todo.expirationDate);
          let tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1)
          return date > today && date > tomorrow;
        });
        break;
      
      
      case TypeView_Enum.PROJECTS:

        let todos_tmp = todos.filter((todo) => {
          return todo.project != null;
        });

        this.todos = todos_tmp.filter((todo) => {
          return todo.project.id == this.currentProject.id;
        });

        break;
    }
  }








}
