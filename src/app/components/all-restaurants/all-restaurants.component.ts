import { Component, OnInit } from '@angular/core';
import { Restaurants } from '../../models/restaurants';
import { RestaurantsService } from '../../services/restaurants.service';
import { CommonModule } from '@angular/common';
import { SingleRestaurantComponent } from "../single-restaurant/single-restaurant.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-restaurants',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SingleRestaurantComponent, HeaderComponent, FooterComponent],
  templateUrl: './all-restaurants.component.html',
  styleUrl: './all-restaurants.component.css'
})
export class AllRestaurantsComponent implements OnInit {

  restaurants:Restaurants[] = []
  filteredRestaurant:Restaurants[] = [];
  searchQuery:string = '';
  isAdmin!:boolean

  constructor(private restaurantsService:RestaurantsService, private authService:AuthService) {}

  ngOnInit(): void {
    this.restaurantsService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
        this.filterRestaurants();
      },
      (error) => {console.log(error)}
    );

    this.authService.isAdmin().subscribe(
      (data) => {this.isAdmin = data},
      (error) => console.log(error)
    )
  }

  filterRestaurants() {
    const query = this.searchQuery.toLowerCase();
    this.filteredRestaurant = this.restaurants.filter(restaurant =>
      restaurant.restaurant_name.toLowerCase().includes(query)
    );
  }
}
