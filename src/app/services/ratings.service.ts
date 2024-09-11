import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ratings } from '../models/ratings';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  
  constructor(private http:HttpClient) { }

  private apiUrl:string = "http://localhost:8082/api/ratings/"

  getAllRatingsByRestaurantId(restaurantId:number):Observable<Ratings[]> {
    return this.http.get<Ratings[]>(`${this.apiUrl}restaurant/${restaurantId}`);
  }

  getAllRatingsByCustomerId(restaurantId:number):Observable<Ratings[]> {
    return this.http.get<Ratings[]>(`${this.apiUrl}customer/${restaurantId}`);
  }
}
