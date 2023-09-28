import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription, exhaustMap, fromEvent } from 'rxjs';
import { REGISTER_FORM_TEXTS } from 'src/app/constants/texts.constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExistingEmailValidator, ExistingLoginValidator, checkPasswordsEquality } from 'src/app/utils/customValidators';
import { hidePassword, showPassword } from 'src/app/utils/password.functions';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
    @ViewChild('registerButton') public registerButton!: ElementRef;
    
    public  translations = REGISTER_FORM_TEXTS;
    
    public registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required], ExistingEmailValidator.createValidator(this.authService)],
      login: [null, [Validators.required, Validators.minLength(3)], ExistingLoginValidator.createValidator(this.authService)],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]{8,32}$/)]],
      repeatPassword: ['', Validators.required]
    }, { validators: checkPasswordsEquality()}) // updatedOn: blur affects all controls,  but for repeatPassword it is better to use updateOn: change

    
    private registerSub!: Subscription;
    
    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}
    
    public getControl(control: 'email' | 'login' | 'password' | 'repeatPassword') {
      return this.registerForm.controls[control];
    }
    
    public isValid(control: 'email' | 'login' | 'password' | 'repeatPassword'): boolean | undefined {
      return this.getControl(control)?.invalid && (this.getControl(control)?.dirty || this.getControl(control)?.touched)
    }
    
    public togglePasswordVisibility(input: HTMLInputElement, icon: HTMLElement): void {
      input.type === 'password' ?  showPassword(input, icon.classList) : hidePassword(input, icon.classList);
    }
    
    ngAfterViewInit(): void {
      this.registerSub = this.onRegister().subscribe(
        this.navigateToHome
      );
    }

    ngOnDesroy() {
      this.registerSub.unsubscribe();
    }
    
    private onRegister(): Observable<string> {
      return fromEvent(this.registerButton.nativeElement, 'click')
      .pipe(
        exhaustMap(() => {
          const { login, email, password } = this.registerForm.value;

          return this.authService.createAccount(email, login, password)
        })
      )
  }

  public navigateToHome(token: string) {
      if(token) {
        const url = ['home'];

        this.router.navigate(url)
      }
  }

  public goToLogIn() {
      this.router.navigate(['login'])
  }
}
