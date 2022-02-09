import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.css'],
})
export class RegisterComponent implements OnInit {

  @ViewChild('pwd') pwd!: ElementRef;
  @ViewChild('pwd2') pwd2!: ElementRef;

  pdwIsVisible = false;
  eyeIcon = 'far fa-eye';
  value = 50;

  registerForm: FormGroup = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.customValidators.emailPattern),
        ],
        [this.emailValidator],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.customValidators.strongPwd,
        ],
      ],
      password2: ['', [Validators.required]],
    },
    {
      validators: [this.customValidators.samePwd('password', 'password2')],
    }
  );

  constructor(
    private router: Router,
    private userService: AuthService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private customValidators: ValidatorService,
    private emailValidator: EmailValidatorService,
    
  ) { }




  ngOnInit(): void {

  }



  get emailErrorsMsj(): string {
    const errors = this.registerForm.get('email')?.errors;
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
    const errors = this.registerForm.get('password')?.errors;

    console.log(this.registerForm.get('password')?.errors?.minlength);
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
      this.registerForm.controls[inputName].errors &&
      this.registerForm.controls[inputName].touched
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

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }


    this.userService.signup(this.registerForm.value)
      .subscribe(resp => {

        
        this.verifyEmailModal(resp.user.email,resp.user.uid)


      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error' );
      });
  }





  verifyEmailModal(email: string, id: string) {

    let timerInterval: any;

    Swal.fire({
      title: 'Check your email!',
      html:
        `<h4>We have sent a verification email to:</h4><p><p> <b>${email}</b> <p><p>` +
        '<div style="margin-top:50px;">Check your email <b>now</b></div> <p>' +
        '<div class="SwalCountdown" ><strong></strong> Seconds</div>',      
      timer: 60000,
      showConfirmButton: false,
      confirmButtonText: 'Continue <i class="fa fa-arrow-right"></i>',
      allowOutsideClick: false,
      timerProgressBar: true,
      customClass: {
        title: 'SwalTitle',
        htmlContainer: 'SwalBody',
      },
      didOpen: () => {
         
        const countdown:any =Swal.getHtmlContainer()?.querySelector('strong');
        
        timerInterval = setInterval(() => {
          let restante = Swal.getTimerLeft();
          countdown.textContent = (restante! / 1000).toFixed(0);
        }, 100);

      },
      willClose: () => {
         
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      
        this.userService.isEmailVerified(email)
        .subscribe(EmailVerified => {
            
            if (EmailVerified) {
              Swal.fire('Great!', 'Your Email is verified', 'success');
              this.router.navigateByUrl('/');
            } else {
              Swal.fire("Your Email isn't verified", 'Access denied', 'warning');
              this.router.navigateByUrl('/auth');
              localStorage.removeItem('Authorization');
            }
        })
      
      

    });
    
  }

}
