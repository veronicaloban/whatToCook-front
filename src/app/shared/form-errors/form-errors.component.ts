import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_ERRORS_TEXTS } from '../../constants/texts.constant';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {
  @Input() form!: FormGroup;
  @Input() control!: string;

  public texts = FORM_ERRORS_TEXTS;
}
