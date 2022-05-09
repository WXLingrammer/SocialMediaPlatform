import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  role: string | undefined;
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    console.log("canActivate method");
    if (!this.authService.getToken()) {
        console.log("Cannot Activate!");
        this.router.navigate(['login']);
    }
    console.log("this.authService.getToken(): ", this.authService.getToken());
    return this.authService.getToken();
  }
  
}
