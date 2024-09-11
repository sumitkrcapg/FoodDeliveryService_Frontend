import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurants } from '../models/restaurants';
import { HttpClient } from '@angular/common/http';
import { MenuItemsService } from './menu-items.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http:HttpClient, private menuItemsService:MenuItemsService) { }

  private apiUrl:string = "http://localhost:8082/api/restaurants/"

  getAllRestaurants():Observable<Restaurants[]> {
    return this.http.get<Restaurants[]>(this.apiUrl);
  }

  getRestaurantByRestaurantId(restaurantId:number):Observable<Restaurants> {
    return this.http.get<Restaurants>(`${this.apiUrl}${restaurantId}`);
  }

  getMenuItemsByRestaurantId(restaurantId:number) {
    return this.menuItemsService.getMenuItemsByRestaurantId(restaurantId);
  }

  addRestaurant(restaurant:Restaurants):Observable<Restaurants>{
    return this.http.post<Restaurants>(this.apiUrl, restaurant);
  }

  updateRestaurant(restauranId:number, restaurant:Restaurants):Observable<Restaurants>{
    return this.http.put<Restaurants>(`${this.apiUrl}${restauranId}`, restaurant);
  }

  deleteRestaurant(restaurantId:number):Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}${restaurantId}`);
  }
}
