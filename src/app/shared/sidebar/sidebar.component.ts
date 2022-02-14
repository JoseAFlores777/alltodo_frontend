import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { actionType_Enum } from '../../models/enums';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, DoCheck {

  public projects: Project[] = [];
  public isCharging: boolean = false;
  display: boolean = false;
  action: string = actionType_Enum.CREATE;;

  constructor(private projectService: ProjectService) {


    // this.chargeProjects();
   }


  ngOnInit(): void {
  }
  
  ngDoCheck(): void {
     this.projects = this.projectService.projects;
  }

  showProjectDialog() {
    this.display = true;
  }

  closeProjectDialog() {
    this.display = false;
  }


  chargeProjects() { 
    this.isCharging = true;
    this.projectService.chargeProjects()
      .subscribe();
  }

}
