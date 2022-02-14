import { Component, ElementRef, OnInit, Renderer2, ViewChild, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { isEmailExists, isEmailExistsWithException } from 'src/app/shared/validators/email-validator.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, DoCheck {

  public user?: User;

  @ViewChild('pwd') pwd!: ElementRef;
  @ViewChild('pwd2') pwd2!: ElementRef;

  pdwIsVisible = false;
  eyeIcon = 'far fa-eye';
  value = 50;

  updateUserForm: FormGroup = this.fb.group(
    {
      firstName: [this.authService.user?.firstName, [Validators.required]],
      lastName: [this.authService.user?.lastName, [Validators.required]],
      gender: [this.authService.user?.gender, [Validators.required]],
      email: [
        this.authService.user?.email,
        [
          Validators.required,
          Validators.pattern(this.customValidators.emailPattern),
        ],
        [this.isEmailExistsWithException_Validator],
      ],
  
    }
  );

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService ,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private customValidators: ValidatorService,
    private isEmailExistsWithException_Validator: isEmailExistsWithException,
  ) { }


  ngDoCheck(): void {
  
  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  completeCurrentUserName(): string {
    return this.authService.completeCurrentUserName();
  }


  get emailErrorsMsj(): string {
    const errors = this.updateUserForm.get('email')?.errors;
    if (errors?.required) {
      return 'The email is required';
    } else if (errors?.pattern) {
      return 'The email is not valid';
    } else if (errors?.emailExists) {
      return 'The email is already in use';
    }
    return '';
  }

  get passErrorsMsj(): string {
    const errors = this.updateUserForm.get('password')?.errors;

    // console.log(this.updateUserForm.get('password')?.errors?.minlength);
    if (errors?.required) {
      return 'The password is required';
    } else if (errors?.strong) {
      return 'The password is not strong enough';
    } else if (
      errors?.minlength.actualLength < errors?.minlength.requiredLength
    ) {
      return 'The password is too short';
    }
    return '';
  }

  isValidInput(inputName: string) {
    return (
      this.updateUserForm.controls[inputName].errors &&
      this.updateUserForm.controls[inputName].touched
    );
  }

  seePwd() {
    this.pdwIsVisible = !this.pdwIsVisible;

    if (this.pdwIsVisible) {
      this.pwd.nativeElement.type = 'text';
      this.pwd2.nativeElement.type = 'text';
    } else {
      this.pwd.nativeElement.type = 'password';
      this.pwd2.nativeElement.type = 'password';
    }
  }


  updateUser() {

    if (this.updateUserForm.invalid) {
      this.updateUserForm.markAllAsTouched();
      return;
    }

    this.userService.updateUser(this.user!.id, this.updateUserForm.value)
      .subscribe(
        (resp:any) => {
          this.authService.validateToken().subscribe()
          Swal.fire('Great!', "Your changes have been recorded", 'success');
        }, (err) => { 
          // console.log(err)
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
  }

}
