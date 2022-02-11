import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  @Input() display!: boolean;
  @Input() action!: string;
  @Input() IdProject!: string;
  @Input() nameProject!: string;

  @Output() isHide: EventEmitter<boolean> = new EventEmitter();

  public project!: Project;

  projectForm: FormGroup = this.fb.group({
    name: [this.nameProject],
    description: [''],
    color:[''],
  });

  constructor(private fb: FormBuilder, private projectService: ProjectService,private activatedRoute: ActivatedRoute) {
    


  }


 
  

 

  ngOnInit(): void {

    this.readPathParameter();
    this.projectForm.controls['name'].setValue(this.project.name);
    this.projectForm.controls['description'].setValue(this.project.description);
    this.projectForm.controls['color'].setValue(this.project.color);
  

  }


  readPathParameter() {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        this.chargeProject(id);
    })
  }


  chargeProject(id:string) {
    this.projectService.chargeProjectById(id)
      .subscribe((project: any) => { 
        this.project = project;
      })
  }

  hideForm() {
    this.isHide.emit(false);
    this.projectForm.reset();
   
  }

  showForm() {
    
    
  }





  manage() {
    
  }

}
