import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";

import { Observable, delay, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

/* SYNC VALIDATORS */
export function checkPasswordsEquality(): ValidatorFn {
    return (group: AbstractControl) : ValidationErrors | null => {
  
      const confirmingPassword = group.get('repeatPassword')?.value;
      const password = group.get('password')?.value;
  
      if (!confirmingPassword) { //if we haven't typed anything yet, then we should not see any errors
        return null;
      }
  
      return confirmingPassword === password ? null : { passwordsUnequal: true };
    }
  }

/* ASYNC VALIDATORS */
  
export class ExistingEmailValidator {
    static createValidator(authService: AuthService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return authService
          .checkIfEmailExists(control.value)
          .pipe(
            map((result: boolean) =>
              result ? { exists: true } : null
            )
          );
      };
    }
}
  
export class ExistingLoginValidator {
    static createValidator(authService: AuthService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return of(control.value)
            .pipe(
                delay(400),
                switchMap((value => authService.checkIfLoginExists(value))),
                tap(console.log),
                map((result: boolean) => result ? { exists: true } : null)
            )
        // return authService
        //   .checkIfLoginExists(control.value)
        //   .pipe(
        //     debounceTime(400),
        //     map((result: boolean) =>
        //       result ? { exists: true } : null
        //     )
        //   );
      };
    }
  }