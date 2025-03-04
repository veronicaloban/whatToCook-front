import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard  {
    constructor(public authService: AuthService, public router: Router) {}

    canActivate(): Observable<boolean> | boolean {
        const token = this.authService.getAuthorizationToken();

        if(!token) {
            const url = ['login']
            this.router.navigate(url);
        }
        
        return Boolean(token);
    }
}