import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { ProjectForm } from '../interfaces/forms.interface';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  public currentProject!: Project;
  public projects: Project[]  =[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  chargeProjects() {
    return this.http.get(`${base_url}/projects`, this.authService.headers)
      .pipe(
        tap((projects: any) => { 
          this.projects = projects;
        })
      )
  }

  chargeProjectById(id: string) { 
    return this.http.get(`${base_url}/projects/${id}`, this.authService.headers)
      .pipe(
        tap((project: any) => {
           this.currentProject = project;
         })
    )
  }

  deleteProject(id: string) { 
    return this.http.delete(`${base_url}/projects/${id}`, this.authService.headers);
  }

  createProject(formData: ProjectForm) { 
    return this.http.post(`${base_url}/projects`, formData, this.authService.headers);
  }

  updateProject(id: string, formData: ProjectForm) { 
    return this.http.put(`${base_url}/projects/${id}`, formData, this.authService.headers);
  }

}
