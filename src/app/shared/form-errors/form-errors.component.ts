import { Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormControlStatus, FormGroup } from '@angular/forms';
import { FORM_ERRORS_TEXTS } from '../../constants/texts.constant';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
  standalone: true,
})
export class FormErrorsComponent implements OnInit {
  @Input() control!: FormControl;

  private readonly destroyRef = inject(DestroyRef);

  protected readonly error = signal('');

  public texts = FORM_ERRORS_TEXTS;

  public ngOnInit() {
    this.control.statusChanges
    .pipe()
    .subscribe({
      next: (status: FormControlStatus) => {
        console.log(status, 'status111')
        if(status === 'INVALID') {
          this.showError()
        }
      }
    })
  }

  private showError(): void {
    console.log(this.control.errors);
    if (!this.control.errors) {
      return;
    }

    const error = Object.keys(this.control.errors)[0];

    this.error.set(this.texts[error]);
  }
}
