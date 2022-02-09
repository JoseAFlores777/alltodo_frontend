import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../shared/validators/validator.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
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
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private render: Renderer2,
    private customValidators: ValidatorService
  ) {}

  ngOnInit(): void {}

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
    this.failedAttempts = 0;
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


  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (resp) => {
        console.log('object',resp.user.Id);
        if (!resp.userEmailVerified) {
          this.sendVerificationEmail(this.loginForm.get('email')?.value,resp.user.Id);
        } else {
          this.router.navigateByUrl('/');
        }
      },
      (err) => {
        this.failedAttempts++        
        Swal.fire('Error', err.error.msg, 'error');
        if (this.failedAttempts >2) {
          
          this.forgotPasswordModal(this.loginForm.get('email')?.value)
        }
      }
    );
  }

  sendVerificationEmail(email: string, id: string) {
    Swal.fire('Attention!', "You haven't verified your email yet", 'warning');
    localStorage.removeItem('Authorization');


    this.authService.sendVerificationEmail(email).subscribe((EmailSent) => {
      if (EmailSent) {
        this.verifyEmailModal(email, id);
      }
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
      confirmButtonText: 'Continuar <i class="fa fa-arrow-right"></i>',
      allowOutsideClick: true,
      timerProgressBar: true,
      customClass: {
        title: 'SwalTitle',
        htmlContainer: 'SwalBody',
      },
      didOpen: () => {
        const countdown: any = Swal.getHtmlContainer()?.querySelector('strong');

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

      this.authService.isEmailVerified(email).subscribe((EmailVerified) => {
        if (EmailVerified) {
          Swal.fire('Great!', 'Your Email is verified', 'success');
          console.log('is verified');
          this.router.navigateByUrl('/');
        } else {
          Swal.fire("Your Email isn't verified", 'Access denied', 'warning');
          console.log('is verified');
          this.router.navigateByUrl('/auth');
          localStorage.removeItem('Authorization');
        }
      });
    });
  }

  forgotPasswordModal(email?: string) {
    console.log("first");
    Swal.fire({
      title: '¿Olvidaste tu Contraseña?',
      input: 'email',
      inputLabel: 'Te enviaremos un correo para que puedas cambiarla',
      inputPlaceholder: 'Correo electrónico',
      customClass: {
        title: 'SwalTitle',
      },
      showConfirmButton: true,
      confirmButtonText: 'Enviar <i class="fas fa-paper-plane"></i>',
      inputValue: email ? email : '',
    }).then((result) => {
      if (result.isConfirmed) {
        this.failedAttempts = 0;
        // this.authService.resetUserPassword(result.value);
        // this.authService
        //   .resetUserPassword(result.value)
        //   .subscribe((EmailSent) => {
        //     if (EmailSent) {
        //       Swal.fire({
        //         icon: 'success',
        //         title: `¡Correo Enviado a ${result.value}!`,
        //         showConfirmButton: true,
        //         confirmButtonText: 'Listo <i class="fas fa-thumbs-up"></i>',
        //       });
        //     }
        //   });
      }
    });
  }
}
