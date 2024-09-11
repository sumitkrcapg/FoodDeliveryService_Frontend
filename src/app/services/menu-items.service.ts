import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItems } from '../models/menu-items';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  private apiUrl:string = "http://localhost:8082/api/restaurants/"
  constructor(private http:HttpClient) { }

  getMenuItemById(menuItemId:number):Observable<MenuItems> {
    return this.http.get<MenuItems>(`${this.apiUrl}menuitem/${menuItemId}`)
  }

  getMenuItemsByRestaurantId(restaurantId:number):Observable<MenuItems[]> {
    return this.http.get<MenuItems[]>(`${this.apiUrl}${restaurantId}/menu`)
  }

  addMenuItem(menuItem:MenuItems):Observable<MenuItems>{
    const url = `${this.apiUrl}${menuItem.restaurant_id}/menu`;
    return this.http.post<MenuItems>(url, menuItem);
  }

  updateMenuItem(restaurantId:number, menuItemId:number, menuItem:MenuItems):Observable<MenuItems>{
    return this.http.put<MenuItems>(`${this.apiUrl}${restaurantId}/menu/${menuItemId}`, menuItem);
  }

  deleteMenuItem(restaurantId:number, menuItemId:number):Observable<MenuItems> {
    return this.http.delete<MenuItems>(`${this.apiUrl}${restaurantId}/menu/${menuItemId}`);
  }
}
