import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl:string="http://localhost:8082/api/orders/"
  
  constructor(private http:HttpClient) { }

  getOrders(): Observable<Orders[]>{
    return this.http.get<Orders[]>(this.apiUrl);
  }

  getOrdersByCustomerId(customerId: number):Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.apiUrl}${customerId}/orders`);
  }

  placeOrder(customerId:number, restaurantId:number, driverId:number):Observable<Orders> {
    return this.http.post<Orders>(`${this.apiUrl}${customerId}/${restaurantId}/${driverId}`, '');
  }

  updateOrderStatus(orderId: number, status: string): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}${orderId}/status`, status);
  }
 
  cancelOrder(orderId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}${orderId}`);
  }
}
