import { Component, Input } from '@angular/core';
import { Restaurants } from '../../models/restaurants';
import { MenuItems } from '../../models/menu-items';
import { Router } from '@angular/router';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-single-restaurant',
  standalone: true,
  imports: [],
  templateUrl: './single-restaurant.component.html',
  styleUrl: './single-restaurant.component.css'
})
export class SingleRestaurantComponent {

  @Input() restaurant!:Restaurants
  menuItems:MenuItems[] = []
  imageUrl:string = faker.image.urlLoremFlickr({category: 'restaurant'});

  constructor(private router:Router) {}

  getMenuItemsByRestaurantId(restaurantId:number) {
    this.router.navigate(['menu', restaurantId]);
  }
}
