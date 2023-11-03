import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { LayoutComponent } from './layout.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('LayoutComponent', () => {
  let authServiceMock: ReturnType<jest.Mock>;

  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    authServiceMock = {
      logOut: jest.fn(() => {})
    }

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: Router,
        },
      ],
      imports: [CommonModule, RouterTestingModule.withRoutes([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logOut when clicking on Log out tab', async () => {
    const logOutMethodSpy = jest.spyOn(component, 'logOut');

    const logOutTabDe = fixture.debugElement.queryAll(By.css('a'));
    const link: HTMLElement = logOutTabDe[logOutTabDe.length - 1].nativeElement;

    link.click();

    fixture.whenStable().then(() => {
      expect(logOutMethodSpy).toHaveBeenCalled();
    })
  })
});
