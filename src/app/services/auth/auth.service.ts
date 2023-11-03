import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { urls } from '../../constants/urls';

const { authURL } = urls;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getAuthorizationToken();

    if (token) { this._isLoggedIn$.next(true) }
  }
  
  public checkIfEmailExists(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${ authURL }/checkExistingEmail`, { email });
  }

  public checkIfLoginExists(login: string): Observable<boolean> {
    return this.http.post<boolean>(`${ authURL }/checkExistingLogin`, { login });
  }

  public createAccount(email: string | undefined | null, username: string | undefined | null, password: string | undefined | null) { //rewrite
    return this.http.post<string>(`${ authURL }/signup`, { email, username, password })
    .pipe(
      tap(token => {
        this._isLoggedIn$.next(true);
        this.setAuthorizationToken(token);
      })
    )
  }

  public logIn(username: string | undefined | null, password: string | undefined | null): Observable<string>{
    return this.http.post<string>(`${ authURL }/login`, { username, password })
    .pipe(
      tap(token => {
        this._isLoggedIn$.next(true);
        this.setAuthorizationToken(token);
      })
    )
  }

  private setAuthorizationToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getAuthorizationToken(): string | null {
    return localStorage.getItem('token');
  }
  
  public logOut(): void {
    //should be make additional request for logging out? or just clear the storage is enough?
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
  }
}
