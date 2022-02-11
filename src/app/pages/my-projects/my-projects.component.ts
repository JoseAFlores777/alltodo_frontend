import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { TodoTypeView, TypeView_Enum } from '../../models/TodoTypeView';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css'],
})
export class MyProjectsComponent implements OnInit {
  todoTypeView: TodoTypeView = new TodoTypeView(
    TypeView_Enum.PROJECTS,
    'All to Do',
    'Completed'
  );
  public porcentantCompleted: number = 0;
  public totalTasksCompleted: number = 0;
  public totalTasks: number = 0;
  display: boolean = false;
  action: string = 'Update';
  color2!: string;

  public project!: Project;

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.readPathParameter();
  }

  readPathParameter() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.chargeProject(id);
    });
  }

  getProject() {
    this.readPathParameter();
    return this.project;
  }

  getIdProject() {
    return this.project.id;
  }

  showProjectDialog() {
    this.display = true;
    // this.nameForm.reset({
    //   firstName: this.user?.firstName,
    //   lastName: this.user?.lastName,
    // });
  }

  closeProjectDialog() {
    this.display = false;
  }

  chargeProject(id: string) {
    this.projectService.chargeProjectById(id).subscribe((project: any) => {
      this.project = project;
      console.log(this.projectService.currentProject);
    });
  }
}
