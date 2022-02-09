import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment  } from "../../../environments/environment";
import { catchError, map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {


  constructor(private http: HttpClient) { }
 
validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  
  const email = control.value;

  return this.http.get<any>(`${base_url}/auth/users/find/${email}`)
    .pipe(
      map(resp => {
        return (resp.ok === false)
        ?null
        :{emailExists:true}
      })
    )
}

}
