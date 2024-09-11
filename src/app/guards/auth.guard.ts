import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAdmin().pipe(
      take(1),
      map(isAdmin => !!isAdmin),
      tap(isAdmin => {
        if(!isAdmin) {
          this.router.navigate(['/']); // Redirect to a not-authorized page or similar
        }
      })
    );
  }
}
