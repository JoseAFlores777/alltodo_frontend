import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { UpdateUserForm } from '../interfaces/forms.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }
  


  updateUser(id: string, formData: UpdateUserForm) {
    return this.http.put(`${base_url}/users/${id}`, formData, this.authService.headers);

  }
}
