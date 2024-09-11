import { Component } from '@angular/core';
import { Customers } from '../../models/customers';
import { CustomersService } from '../../services/customers.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Ratings } from '../../models/ratings';
import { RatingsService } from '../../services/ratings.service';
import { TestimonialComponent } from "../testimonial/testimonial.component";
import { CommonModule } from '@angular/common';
import { Restaurants } from '../../models/restaurants';
import { SingleRestaurantComponent } from "../single-restaurant/single-restaurant.component";
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, TestimonialComponent, CommonModule, SingleRestaurantComponent, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  customer!:Customers;
  customerId!:number
  favRestaurants:Restaurants[] = []
  ratings:Ratings[] = []
  isAdmin!:boolean
  imageUrl:string = faker.image.urlLoremFlickr({category: 'person'});

  constructor(private customerService: CustomersService, private ratingService:RatingsService, private activatedRoute: ActivatedRoute, private route:Router, private authService:AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const customerId = params['id'];
      this.customerId = customerId;
      this.getCustomerById(customerId);
    });

    this.customerService.getFavoriteRestaurant(this.customerId).subscribe(
      (data) => {
        this.favRestaurants = data;
      },
      (error) => console.log(error)
    )

    this.ratingService.getAllRatingsByCustomerId(this.customerId).subscribe(
      (data) => {this.ratings = data},
      (error) => console.log(error)
    )

    this.authService.isAdmin().subscribe(
      (data) => {this.isAdmin = data},
      (error) => console.log(error)
    )
  }

  getCustomerById(customerId: number): void {
    this.customerService.getCustomerById(customerId).subscribe(
      data => {this.customer = data},
      error => {console.error(error)}
    );
  }

  updateProfile() {
    this.route.navigate(['/updatecustomer', this.customerId])
  }

  deleteProfile(event:Event) {
    event.stopPropagation(); // Prevent the row click event
 
    if (confirm('Are you sure you want to delete your account?')) {
      this.customerService.deleteCustomer(this.customerId).subscribe(
        (data) => {
          this.authService.logout();
          this.route.navigate(['/home']);
        },
        (error) => console.log(error)
      );
    }
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/home']);
  }

  removefromFavorites(restaurantId: number) {
    this.customerService.deleteFavoriteRestaurant(this.customerId, restaurantId).subscribe(
      (data) => {console.log(data)},
      (error) => console.log(error)
    )
    this.favRestaurants = this.favRestaurants.filter(r => r.restaurant_id != restaurantId)
  }
}
