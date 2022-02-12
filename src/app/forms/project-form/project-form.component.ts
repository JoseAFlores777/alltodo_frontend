import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { actionType_Enum } from '../../models/enums';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ProjectFormComponent implements OnInit, DoCheck {
  @Input() display!: boolean;
  @Input() action!: string;
  @Output() isHide: EventEmitter<boolean> = new EventEmitter();

  public project!: Project;

  projectForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    color: ['#6c6eb3'],
  });

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}
  ngDoCheck(): void {
    this.project = this.projectService.currentProject;

    // console.log("in service", this.project);
  }

  ngOnInit(): void {}

  hideForm() {
    this.isHide.emit(false);
    this.projectForm.reset();
  }

  showForm() {
    //this.projectForm.controls['color'].setValue('#6c6eb3');
    if (this.project != undefined && this.action === actionType_Enum.UPDATE) {
      this.projectForm.controls['name'].setValue(this.project.name);
      this.projectForm.controls['description'].setValue(
        this.project.description
      );
      this.projectForm.controls['color'].setValue(this.project.color);
    }
  }

  manageProject() {
    if (this.action === actionType_Enum.CREATE) {
      this.createProject();
    } else {
      this.updateProject();
    }
  }

  confirmDeleteProject(event: Event) {
    this.confirmationService.confirm({
      target: event!.target!,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProject();
      },
      reject: () => {
        //reject action
      },
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.project.id).subscribe(
      (res: any) => {
        this.hideForm();
        this.router.navigateByUrl('/');
        this.projectService.chargeProjects().subscribe();
        Swal.fire('Great!', res.msg, 'success');
      },
      (err) => {
        this.hideForm();
        Swal.fire('something goes wrong!', err.error, 'error');
      }
    );
  }

  createProject() {
    this.projectService.createProject(this.projectForm.value).subscribe(
      (res: any) => {
        this.hideForm();
        this.projectService.chargeProjects().subscribe();
        Swal.fire('Great!', 'Successfully created', 'success');
      },
      (err) => {
        this.hideForm();
        Swal.fire('something goes wrong!', err.error, 'error');
      }
    );
  }

  updateProject() {
    this.projectService.updateProject(this.project.id, this.projectForm.value).subscribe(
      (res: any) => {
        this.hideForm();
        this.projectService.chargeProjects().subscribe();
        this.projectService.chargeProjectById(this.project.id).subscribe();
        Swal.fire('Great!', 'Successfully updated', 'success');
      },
      (err) => {
        this.hideForm();
        Swal.fire('something goes wrong!', err.error, 'error');
      }
    );
  }
}
