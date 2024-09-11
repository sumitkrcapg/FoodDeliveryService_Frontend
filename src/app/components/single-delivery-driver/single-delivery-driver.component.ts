import { Component, Input } from '@angular/core';
import { DeliveryDrivers } from '../../models/delivery-drivers';
import { Router } from '@angular/router';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-single-delivery-driver',
  standalone: true,
  imports: [],
  templateUrl: './single-delivery-driver.component.html',
  styleUrl: './single-delivery-driver.component.css'
})
export class SingleDeliveryDriverComponent {

  @Input() deliveryDriver!:DeliveryDrivers;
  imageUrl:string = faker.image.urlLoremFlickr({category: 'person'});

  constructor(private route:Router) {}
}
