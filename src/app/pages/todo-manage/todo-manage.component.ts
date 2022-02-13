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
import { timeType_Enum } from '../../models/enums';
import { Todo } from '../../models/todo.model';


@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.css'],
  providers: [ConfirmationService, MessageService, DatePipe],
})
export class TodoManageComponent implements OnInit, DoCheck {
  @ViewChild('scheduleCalendar') scheduleCalendar!: ElementRef;
  @ViewChild('op2') op2!: ElementRef;

  @Input() todoTypeView!: TodoTypeView;
  @Input() currentProject!: Project;
  @Input() color!: string;

  visibilityTodoDialog: boolean = false;
  idDialogScheduleHide: boolean = true;

  schedule_tmp!: Date;
  projects!: Project[];
  selectedProject!: Project;

  minDate: string | null = this.dateToStringFormat(
    new Date(),
    'yyyy-MM-ddThh:mm'
  );

  timeTypes = {
    TODAY: timeType_Enum.TODAY,
    TOMORROW: timeType_Enum.TOMORROW,
    NEXT_WEEK: timeType_Enum.NEXT_WEEK,
  };

  todoAddForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    projectId: [''],
    expirationDate: [new Date(), Validators.required],
  });

  // ToDo Part

  displayEditTodo!: boolean;
  displayEditTodo2: boolean = true;
  todos: Todo[] = [];

  todoEditForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    projectId: [''],
    expirationDate: [new Date(), Validators.required],
  });

  constructor(
    public datepipe: DatePipe,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.chargeProjects();
  }

  ngDoCheck(): void {
    this.projects = this.projectService.projects;
  }

  ngOnInit(): void {}

  chargeProjects() {
    this.projectService.chargeProjects().subscribe();
  }

  hideAddTodoDialog() {
    this.visibilityTodoDialog = false;
    this.todoAddForm.reset();
  }

  showAddTodoDialog() {
    this.visibilityTodoDialog = true;
  }

  onShowScheduleDialog() {
    this.schedule_tmp = this.scheduleCalendar.nativeElement.value;
  }

  dateToStringFormat(date: Date, format: string) {
    return this.datepipe.transform(date, format);
  }

  getDateScheduleFormated() {
    return this.dateToStringFormat(this.schedule_tmp, 'MMM d, E');
  }

  createTodo() {
    this.todoAddForm.controls['projectId'].setValue(this.selectedProject.id);
    this.todoAddForm.controls['expirationDate'].setValue(this.schedule_tmp);

    console.log('title', this.todoAddForm.controls['title'].value);
    console.log('description', this.todoAddForm.controls['description'].value);
    console.log('projectId', this.todoAddForm.controls['projectId'].value);
    console.log(
      'expirationDate',
      this.todoAddForm.controls['expirationDate'].value
    );
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

  

  editTodo(): void {}

  hideEditTodoForm() { 
    this.displayEditTodo = false;
    this.todoEditForm.reset();
  }
  
  showEditTodoForm(todo?: Todo) {
    this.displayEditTodo = true;
  }

  confirmDeleteTodo(event: Event, id:string) {}
}
