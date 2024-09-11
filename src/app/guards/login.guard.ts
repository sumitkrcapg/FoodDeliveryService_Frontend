import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      take(1), // Ensure the observable completes after one emission
      map(isAuthenticated => {
        if(!isAuthenticated) {
          // If authenticated, redirect to home or any other route
          this.router.navigate(['/login']); // Adjust the route as necessary
          return false;
        }
        // If not authenticated, allow access to the route
        return true;
      })
    );
  }
}