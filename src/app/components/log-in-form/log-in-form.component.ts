import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription, catchError, exhaustMap, fromEvent } from 'rxjs';
import { LOGIN_FORM_TEXTS } from 'src/app/constants/texts.constant';

import { AuthService } from 'src/app/services/auth/auth.service';
import { hidePassword, showPassword } from 'src/app/utils/password.functions';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  public getControl(control: 'username' | 'password'): FormControl<string> {
    return this.logInForm.controls[control] as unknown as FormControl<string>;
  }
  
  public isInValid(control: 'username' | 'password'): boolean {
    return this.getControl(control).invalid && (this.getControl(control).dirty || this.getControl(control).touched);
  }
  
  public navigateToHome(token: string): void {
    if(token) {
      this.router.navigate(['home'])
    }
  }
  
  public goToSignup(): void {
    this.router.navigate(['signup']);
  }

  public togglePasswordVisibility(input: HTMLInputElement, icon: HTMLElement): void {
    input.type === 'password' ?  showPassword(input, icon.classList) : hidePassword(input, icon.classList);
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
