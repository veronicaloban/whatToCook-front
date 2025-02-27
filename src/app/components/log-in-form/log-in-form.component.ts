import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, exhaustMap, fromEvent } from 'rxjs';

import { LOGIN_FORM_TEXTS } from 'src/app/constants/texts.constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormErrorsComponent } from 'src/app/shared/form-errors/form-errors.component';
import { InputComponent } from 'src/app/shared/input/input.component';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    
    FormErrorsComponent,
    InputComponent
  ]
})
export class LogInFormComponent {
  private logInSub!: Subscription;
  
  @ViewChild('logInButton') public logInButton!: ElementRef;

  public translations = LOGIN_FORM_TEXTS;
  public logInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]]
  })
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}
  
  public navigateToHome(token: string): void {
    if(token) {
      this.router.navigate(['home'])
    }
  }
  
  public goToSignup(): void {
    this.router.navigate(['signup']);
  }

  ngAfterViewInit(): void {
    this.logInSub = this.onLogIn()
      .subscribe(token => this.navigateToHome(token));
  }

  ngOnDestroy(): void {
    this.logInSub.unsubscribe();
  }
  
  private onLogIn(): Observable<string> {
    return fromEvent(this.logInButton.nativeElement, 'click')
      .pipe(
        exhaustMap(() => {
          const { username, password } = this.logInForm.value;

          return this.authService.logIn(username, password);
        }),
        catchError(() => this.setFormErrors()),
      )
  }

  private setFormErrors(): Observable<string> {
    this.logInForm.controls['username'].setErrors({'incorrect': true});
    this.logInForm.controls['password'].setErrors({'incorrect': true});

    this.cdr.markForCheck();

    return this.onLogIn(); //retry original obeservable immediately
  }
}
