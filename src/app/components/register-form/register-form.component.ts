import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription, exhaustMap, fromEvent } from 'rxjs';
import { REGISTER_FORM_TEXTS } from 'src/app/constants/texts.constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormErrorsComponent } from 'src/app/shared/form-errors/form-errors.component';
import { InputComponent } from 'src/app/shared/input/input.component';
import { ExistingEmailValidator, ExistingLoginValidator, checkPasswordsEquality } from 'src/app/utils/customValidators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    
    FormErrorsComponent,
    InputComponent
  ]
})
export class RegisterFormComponent {
  @ViewChild('registerButton') public registerButton!: ElementRef;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly translations = REGISTER_FORM_TEXTS;
  protected readonly registerForm = this.fb.group({
    email: [null, [Validators.email, Validators.required], ], //ExistingEmailValidator.createValidator(this.authService)
    login: [null, [Validators.required, Validators.minLength(3)], ExistingLoginValidator.createValidator(this.authService)],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]{8,32}$/)]],
    repeatPassword: ['', Validators.required]
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
    return fromEvent<string>(this.registerButton.nativeElement, 'click')
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
