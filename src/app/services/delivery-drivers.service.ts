import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryDrivers } from '../models/delivery-drivers';

@Injectable({
  providedIn: 'root'
})
export class DeliveryDriversService {

  private apiUrl:string="http://localhost:8082/api/drivers/"

  constructor(private http:HttpClient) { }

  getAllDrivers():Observable<DeliveryDrivers[]>{
    return this.http.get<DeliveryDrivers[]>(this.apiUrl);
  }
}
