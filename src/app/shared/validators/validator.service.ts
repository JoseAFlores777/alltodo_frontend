import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  name_lastName_regex : string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  

  constructor() { }


  //validate the confirmation of the password in the register form
  samePwd(input1:string,input2:string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      
      const pwd1 = formGroup.get(input1)?.value;
      const pwd2 = formGroup.get(input2)?.value;

      if (!(pwd1===pwd2)) {
        formGroup.get(input2)?.setErrors({ notSamePwd: true });
        return {
          notSamePwd: true
        }
      }

      formGroup.get(input2)?.setErrors(null);
      return null

    }
  }


  strongPwd(control: FormControl): any {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
        // return what´s not valid
        return { strong: true };
    }
    return null;
}
}
