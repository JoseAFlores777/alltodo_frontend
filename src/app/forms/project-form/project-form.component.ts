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
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
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
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngDoCheck(): void {
    this.project = this.projectService.currentProject;
    this.projectForm.controls['color'].setValue('#6c6eb3');
    console.log("in service", this.project);
    if (this.project != undefined && this.action === 'Update') {
      
      this.projectForm.controls['name'].setValue(this.project.name);
      this.projectForm.controls['description'].setValue(this.project.description);
      this.projectForm.controls['color'].setValue(this.project.color);
    }
  }

  ngOnInit(): void {

  }

  hideForm() {
    this.isHide.emit(false);
    this.projectForm.reset();
  }

  manage() {}
}
