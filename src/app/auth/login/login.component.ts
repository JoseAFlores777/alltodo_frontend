import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../shared/validators/validator.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['../auth.css'],
  
})
export class LoginComponent implements OnInit {

  @ViewChild('pwd') pwd!: ElementRef;
  @ViewChild('inputEmail') email!: ElementRef;

  pdwIsVisible = false;



  failedAttempts = 0;

  loginForm: FormGroup = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [
        Validators.required,
        Validators.pattern(this.customValidators.emailPattern),
      ],
    ],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  

  constructor(
    private fb: FormBuilder,
    private router: Router,
   // private authService: AuthService,
    private ngZone: NgZone,
    private render: Renderer2,
    private customValidators: ValidatorService,

  ) { }

  ngOnInit(): void {

  }


  login() {
    console.log("Hice Login");
  }





    //hide and show the password
    seePwd() {
      this.pdwIsVisible = !this.pdwIsVisible;
  
      if (this.pdwIsVisible) {
        this.pwd.nativeElement.type = 'text';
      } else {
        this.pwd.nativeElement.type = 'password';
      }
    }
  
  
    resetAttemps() {
      this.failedAttempts=0;
      console.log(this.failedAttempts);
    }
  
    isValidInput(inputName: string) {
      return (
        this.loginForm.controls[inputName].errors &&
        this.loginForm.controls[inputName].touched
      );
    }
  
    get emailErrorsMsj(): string {
      const errors = this.loginForm.get('email')?.errors;
      if (errors?.required) {
        return 'The email is required';
      } else if (errors?.pattern) {
        return 'The email is not valid';
      }
      return '';
    }


  
  forgotPassword() {

}











}
