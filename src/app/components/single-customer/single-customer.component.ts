import { Component, Input } from '@angular/core';
import { Customers } from '../../models/customers';
import { Router } from '@angular/router';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-single-customer',
  standalone: true,
  imports: [],
  templateUrl: './single-customer.component.html',
  styleUrl: './single-customer.component.css'
})
export class SingleCustomerComponent {

  @Input() customer!:Customers;
  imageUrl:string = faker.image.urlLoremFlickr({category: 'person'});

  constructor(private route:Router) {}

  // Navigate to profile with customer ID
  viewCustomerProfile(customerId:number) {
    this.route.navigate(['profile', customerId]);
  }
}
