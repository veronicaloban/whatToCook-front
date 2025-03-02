import { Component, inject, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl} from '@angular/forms';

import { hidePassword, showPassword } from 'src/app/utils/password.functions';

@Component({
    selector: 'app-input',
    imports: [FormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css'
})
export class InputComponent implements ControlValueAccessor {
  public readonly placeholder = input.required<string>();
  public readonly type = input<string>();

  private control = inject(NgControl);

  private _value!: string;

  constructor() {
    this.control && (this.control.valueAccessor = this);
  }

  public get invalid(): boolean {
    return this.control ? !!this.control.invalid : false;
 }

  public get showError(): boolean {
    if (!this.control) {
      return false;
  }

  const { dirty, touched } = this.control;

  return this.invalid ? (!!dirty || !!touched) : false;
}

  protected togglePasswordVisibility(input: HTMLInputElement, icon: HTMLElement): void {
    input.type === 'password' ?  showPassword(input, icon.classList) : hidePassword(input, icon.classList);
  }

  onChange: any = () => {}
  onTouch: any = () => {}

  set value(val: string) {
    this._value = val;
    this.onChange(val);
    this.onTouch(val);
  }

  get value(): string {
    return this._value;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
