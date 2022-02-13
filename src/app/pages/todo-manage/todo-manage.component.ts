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
import { timeType_Enum, actionType_Enum } from '../../models/enums';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';


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
    projectId: [''],
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
    this.todos = this.todoService.todos;
  }

  ngOnInit(): void {}

  chargeProjects() {
    this.projectService.chargeProjects().subscribe();
  }

  chargeTodos() { 
    this.todoService.chargeTodos().subscribe();
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
    // this.selectedProject = null;
    this.visibilityTodoDialog = true;
    // this.btnSchedule.nativeElement.value = 'Schedule';
    // this.btnProject.nativeElement.value = 'Project';
    // this.btnProject.nativeElement.style.color = 'rgba(0, 0, 0, 0.6)';
  }

  showEditTodoDialog(todo: Todo) {
    this.TodoList.nativeElement.style.display = 'none';
    this.action = actionType_Enum.UPDATE;
    this.schedule_tmp = todo.expirationDate;
    this.visibilityTodoDialog = true;
    this.todoSaveForm.controls['title'].setValue(todo.title);
    this.todoSaveForm.controls['description'].setValue( todo.description);
    this.todoSaveForm.controls['expirationDate'].setValue(todo.expirationDate);
    // this.btnSchedule.nativeElement.label = this.dateToStringFormat(todo.expirationDate, 'MMM d, E');
    this.currentTodo = todo;
    
    if (todo.project != null) {
      this.todoSaveForm.controls['projectId'].setValue( todo.project.id);
      this.selectedProject = todo.project;
    } else { 
      this.selectedProject = null;
      this.btnProject.nativeElement.style.color = 'rgba(0, 0, 0, 0.6)';
      console.log(this.selectedProject)
    }
    
    
  }



  onShowScheduleDialog() {
    this.schedule_tmp = this.scheduleCalendar.nativeElement.value;
  }

  dateToStringFormat(date: Date, format: string) {
    return this.datepipe.transform(date, format);
  }

  getDateScheduleFormated() {
    return this.dateToStringFormat(this.schedule_tmp!, 'MMM d, E');
  }

  manageTodo() {

    if (this.action == actionType_Enum.CREATE) {
      this.createTodo();
    }

    if (this.action == actionType_Enum.UPDATE) {
      this.updateTodo(this.currentTodo.id)
    }


  }
  
  
  createTodo() {
    this.todoSaveForm.controls['projectId'].setValue(this.selectedProject!.id);
    this.todoSaveForm.controls['expirationDate'].setValue(this.schedule_tmp);
  
    console.log('title', this.todoSaveForm.controls['title'].value);
    console.log('description', this.todoSaveForm.controls['description'].value);
    console.log('projectId', this.todoSaveForm.controls['projectId'].value);
    console.log('expirationDate',this.todoSaveForm.controls['expirationDate'].value);
    
  }
  
  updateTodo(id: string) { 
    console.log('idUser', id);
    console.log('title', this.todoSaveForm.controls['title'].value);
    console.log('description', this.todoSaveForm.controls['description'].value);
    console.log('projectId', this.todoSaveForm.controls['projectId'].value);
    console.log('expirationDate',this.todoSaveForm.controls['expirationDate'].value);
  }


  onRowSelect(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Selected',
      detail: event.data.name,
    });
  }

  setTime(time: string, element: OverlayPanel) {
    let today = new Date();
    let date2 = new Date(today);

    if (time == timeType_Enum.TODAY) {
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
    if (time == timeType_Enum.NEXT_WEEK) {
      date2.setDate(date2.getDate() + 7);
      this.scheduleCalendar.nativeElement.value = this.dateToStringFormat(
        date2,
        'yyyy-MM-ddThh:mm'
      );
    }

    element.hide();
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
    console.log('idUser', id);
  }
}
