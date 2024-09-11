import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customers } from '../models/customers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiUrl:string="http://localhost:8082/api/customers/"

  constructor(private http:HttpClient) { }

  getAllCustomer():Observable<Customers[]>{
    return this.http.get<Customers[]>(this.apiUrl)
  }

  getCustomerById(customerId: number):Observable<Customers> {
    return this.http.get<Customers>(`${this.apiUrl}${customerId}`);
  }

  getCustomerByEmail(customer_email:string):Observable<Customers> {
    return this.http.get<Customers>(`${this.apiUrl}email/${customer_email}`);
  }
  
  addCustomer(customer:Customers):Observable<Customers> {
    return this.http.post<Customers>(`${this.apiUrl}`, customer);
  }

  updateCustomer(customerId:number, customer:Customers):Observable<Customers> {
    return this.http.put<Customers>(`${this.apiUrl}${customerId}`, customer);
  }

  deleteCustomer(customerId:number):Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}${customerId}`);
  }

  getFavoriteRestaurant(customerId:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${customerId}/favouriteRestaurant`);
  }

  addFavoriteRestaurant(customerId:number, restaurantId:number):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${customerId}/favouriteRestaurant/${restaurantId}`, '');
  }

  deleteFavoriteRestaurant(customerId:number, restaurantId:number):Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}${customerId}/favouriteRestaurant/${restaurantId}`);
  }
}
