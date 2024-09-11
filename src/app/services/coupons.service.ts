import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupons } from '../models/coupons';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private http:HttpClient) { }
  private apiUrl:string = "http://localhost:8082/api/coupons/";

  getAllCoupons():Observable<Coupons[]>{
    return this.http.get<Coupons[]>(this.apiUrl);
  }

  getCouponByCode(code:string):Observable<Coupons>{
    return this.http.get<Coupons>(`${this.apiUrl}${code}`);
  }
}
