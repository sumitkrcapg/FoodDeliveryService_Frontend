import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customers } from '../models/customers';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:string = "http://localhost:8082/api/auth/"

  private currentUser = {userEmail:'userEmail', userRole:'userRole'}
  customer!:Customers

  constructor(private http:HttpClient, private route:Router) { }

  validateUser(user_email:string, user_password:string):Observable<any> {
    return this.http.get(`${this.apiUrl}login/${user_email}/${user_password}`)
  }

  login(user: {user_email:string, user_password:string}):void {
    this.validateUser(user.user_email, user.user_password).subscribe(
      (data) => {
        if(data !== null) {
          this.customer = data;
          localStorage.setItem(this.currentUser.userEmail, user.user_email);
          localStorage.setItem(this.currentUser.userRole, data.customer_role);
          this.route.navigate(['/home']);
        }
      },
      (error) => {
        console.log(error);
        this.route.navigate(['/login'])
      }
    );
  }

  isAuthenticated(): Observable<boolean> {
    const user = localStorage.getItem(this.currentUser.userEmail);
    return of(!!user);
  }

  isAdmin(): Observable<boolean> {
    return of((localStorage.getItem(this.currentUser.userRole)) === "admin");
  }

  logout(): void {
    localStorage.removeItem(this.currentUser.userEmail);
    localStorage.removeItem(this.currentUser.userRole);
  }

  resetPassword(user_email:string, user_password:string):Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}resetpassword/${user_email}/${user_password}`, {});
  }
}
