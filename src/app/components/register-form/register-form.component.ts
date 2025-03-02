import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable, Subscription, exhaustMap, fromEvent } from 'rxjs';
import { REGISTER_FORM_TEXTS } from 'src/app/constants/texts.constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormErrorsComponent } from 'src/app/shared/form-errors/form-errors.component';
import { InputComponent } from 'src/app/shared/input/input.component';
import { ExistingEmailValidator, ExistingLoginValidator, checkPasswordsEquality } from 'src/app/utils/customValidators';
import { RegisterForm } from 'src/app/types/register-form.type';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        FormErrorsComponent,
        InputComponent
    ]
})
export class RegisterFormComponent {
  public readonly registerButton = viewChild<ElementRef>('registerButton');

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly translations = REGISTER_FORM_TEXTS;
  protected readonly registerForm = this.fb.nonNullable.group<RegisterForm>({
    email: this.fb.control('', [Validators.email, Validators.required], ExistingEmailValidator.createValidator(this.authService)), //
    login: this.fb.control('', [Validators.required, Validators.minLength(3)], ExistingLoginValidator.createValidator(this.authService)),
    password: this.fb.control('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]{8,32}$/)]),
    repeatPassword: this.fb.control('', Validators.required)
  }, { validators: checkPasswordsEquality()}) // updatedOn: blur affects all controls,  but for repeatPassword it is better to use updateOn: change
    
  private registerSub!: Subscription;
    
  public ngAfterViewInit(): void {
    this.registerSub = this.onRegister()
      .subscribe(token => this.navigateToHome(token));
  }

  public ngOnDesroy(): void {
    this.registerSub.unsubscribe();
  }
    
  private onRegister(): Observable<string> {
    return fromEvent<string>(this.registerButton()?.nativeElement, 'click')
      .pipe(
        exhaustMap(() => {
          const { login, email, password } = this.registerForm.value;
          
          return this.authService.createAccount(email, login, password);
        })
      )
  }

  public navigateToHome(token: string): void {
      if(token) {
        this.router.navigate(['home']);
      }
  }

  public goToLogIn(): void {
      this.router.navigate(['login']);
  }
}
