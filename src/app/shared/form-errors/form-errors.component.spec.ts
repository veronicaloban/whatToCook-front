import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorsComponent } from './form-errors.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormErrorsComponent', () => {
  let component: FormErrorsComponent;
  let fixture: ComponentFixture<FormErrorsComponent>;
  
  let formBuilder: FormBuilder;

  let testFormMock: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ FormErrorsComponent ]
    })
    .compileComponents();

    formBuilder = TestBed.inject(FormBuilder);

    fixture = TestBed.createComponent(FormErrorsComponent);
    component = fixture.componentInstance;

    testFormMock = formBuilder.group({
      testControl: [null]
    });

    component.form = testFormMock;
    component.control = 'testControl';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render This field is required. text if control has required error', () => {
    testFormMock.controls['testControl'].setErrors({'required': true});

    fixture.detectChanges();

    const errorElements = fixture.debugElement.queryAll(By.css('.text-danger'));
    const errorMessage: HTMLElement = errorElements[0].nativeElement.textContent;

    expect(errorElements.length).toEqual(1);
    expect(errorMessage).toMatch(/This field is required./);
  })

  it('should render Username or password is incorrect. text if control has incorrect error', () => {
    testFormMock.controls['testControl'].setErrors({'incorrect': true});

    fixture.detectChanges();

    const errorElements = fixture.debugElement.queryAll(By.css('.text-danger'));
    const errorMessage: HTMLElement = errorElements[0].nativeElement.textContent;

    expect(errorElements.length).toEqual(1);
    expect(errorMessage).toMatch(/Username or password is incorrect./);
  })
});
