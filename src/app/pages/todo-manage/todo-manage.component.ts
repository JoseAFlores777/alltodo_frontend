import { Component, ElementRef, Input, OnInit, ViewChild, DoCheck } from '@angular/core';
import { TodoTypeView } from '../../models/TodoTypeView';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class TodoManageComponent implements OnInit, DoCheck {

  @ViewChild('btnProject') btnProject!: ElementRef;
  @ViewChild('btnSchedule') btnSchedule!: ElementRef;

  @Input() todoTypeView!: TodoTypeView;
  @Input() currentProject!: Project;
  @Input() color!: string;

  visibilityTodoDialog: boolean = false;

  displaySchedule : boolean = false;
  displayProject : boolean = false;
  showButtonBar : boolean = true;


  schedule_tmp!: Date;
  projectId_tmp!: string; 

  projects!: Project[];

  selectedProject!: Project;

  dates!: Date[];

  rangeDates!: Date[];

  minDate!: Date;

  maxDate!: Date;

  invalidDates!: Array<Date>


  todoForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    projectId: [''],
    expirationDate: [new Date(), Validators.required],
  });

  constructor(
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

  ngOnInit(): void {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today,invalidDate];
  }

  chargeProjects() { 
    this.projectService.chargeProjects()
      .subscribe();
  }

  hideAddTodoDialog() {
    this.visibilityTodoDialog = false;
  }

  showAddTodoDialog() {
    this.visibilityTodoDialog = true;
  }

hideScheduleDialog(){
  this.displaySchedule = false;
}
showScheduleDialog(){
  this.displaySchedule = true;
}

  setSchedule(schedule: Date) { 
    this.schedule_tmp = schedule;
  }

  setProjectId(projectId: string) {
    this.projectId_tmp = projectId;
  }



  createTodo() { 

  }


  onRowSelect(event: any) {
    this.messageService.add({severity: 'info', summary: 'Product Selected', detail: event.data.name});
}


}
