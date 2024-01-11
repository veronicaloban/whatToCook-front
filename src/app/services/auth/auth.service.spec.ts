import { TestBed } from '@angular/core/testing';
import {  HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'

import { take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { urls } from '../../constants/urls';

const { authURL } = urls;

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if email exists', () => {
    service
        .checkIfEmailExists('test@test.com')
        .pipe(take(1))
        .subscribe(( res: boolean ) => {
            expect(res).toEqual(true);
    });
    
    const request: TestRequest = httpTestingController.expectOne({
        method: 'POST',
        url: `${ authURL }/checkExistingEmail`
    });
    
    request.flush(true); 
  })

  it('should return false if email doesn\'t exist', () => {
    service
        .checkIfEmailExists('test2@test.com')
        .pipe(take(1))
        .subscribe((res: boolean) => {
            expect(res).toEqual(false)
        })

    const request: TestRequest = httpTestingController.expectOne({
        method: 'POST',
        url: `${ authURL }/checkExistingEmail`
    })

    request.flush(false);
  })

  it('should return true if username exists', () => {
    service
        .checkIfLoginExists('username')
        .pipe(take(1))
        .subscribe(( res: boolean ) => {
            expect(res).toEqual(true);
    });
    
    const request: TestRequest = httpTestingController.expectOne({
        method: 'POST',
        url: `${ authURL }/checkExistingLogin`
    });
    
    request.flush(true); 
  })

  it('should return false if username doesn\'t exist', () => {
    service
        .checkIfLoginExists('username')
        .pipe(take(1))
        .subscribe(( res: boolean ) => {
            expect(res).toEqual(false);
    });
    
    const request: TestRequest = httpTestingController.expectOne({
        method: 'POST',
        url: `${ authURL }/checkExistingLogin`
    });
    
    request.flush(false); 
  })

  it('should return an authorization token when user creates account', () => {
    service
        .createAccount('test@test.com', 'username', 'password')
        .pipe(take(1))
        .subscribe((res: string) => {
            expect(res).toBeTruthy()
        })

    const request: TestRequest = httpTestingController.expectOne({
        method: 'POST',
        url: `${ authURL }/signup`,
    })

    request.flush('authToken');
  })

  it('should return an authorization token when user logges in', () => {
    service
        .logIn('username', 'password')
        .pipe(take(1))
        .subscribe((res: string) => {
            expect(res).toBeTruthy();
            expect(localStorage.getItem('token')).toBe(res);
        })

    const request: TestRequest = httpTestingController.expectOne({
        method: 'POST',
        url: `${ authURL }/login`,
    });

    request.flush('authToken');
  })

  it('shouldn\'t return an authorization token when user logges in with invalid credentials', () => {
    service
        .logIn('invalidUsername', 'invalidPassword')
        .pipe(take(1))
        .subscribe((res: string) => {
            expect(res).toBeFalsy();
            expect(localStorage.getItem('token')).toBeNull();
        })
    
    const request: TestRequest = httpTestingController.expectOne({
        method: 'POST',
        url: `${ authURL }/login`,
    })

    request.flush(null, { status: 404, statusText: 'Not Found' })
  })

  afterEach(() => {
    httpTestingController.verify();
  });

});
