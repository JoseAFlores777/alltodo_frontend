import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public projects: Project[] = [];
  public isCharging: boolean = false;
  display: boolean = false;
  action: string = "Create";

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.chargeProjects();
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


  chargeProjects() { 
    this.isCharging = true;
    this.projectService.chargeProjects()
      .subscribe((projects : any) => {
        this.projects = projects;
        this.isCharging = false;
      })
  }

}
