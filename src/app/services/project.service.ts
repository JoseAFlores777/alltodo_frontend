import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  chargeProjects() {
    return this.http.get(`${base_url}/projects`, this.authService.headers);
  }

  chargeProjectById(id: string) { 
      return this.http.get(`${base_url}/projects/${id}`, this.authService.headers);
  }

}
