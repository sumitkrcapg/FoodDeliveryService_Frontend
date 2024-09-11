import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../../services/menu-items.service';
import { MenuItems } from '../../models/menu-items';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SingleMenuItemComponent } from "../single-menu-item/single-menu-item.component";
import { Restaurants } from '../../models/restaurants';
import { RestaurantsService } from '../../services/restaurants.service';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../../services/auth.service';
import { TestimonialComponent } from "../testimonial/testimonial.component";
import { FormsModule } from '@angular/forms';
import { faker } from '@faker-js/faker';
import { CustomersService } from '../../services/customers.service';
import { RatingsService } from '../../services/ratings.service';
import { Ratings } from '../../models/ratings';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-all-menu-items',
  standalone: true,
  imports: [CommonModule, FormsModule, SingleMenuItemComponent, RouterLink, FooterComponent, HeaderComponent, TestimonialComponent],
  templateUrl: './all-menu-items.component.html',
  styleUrl: './all-menu-items.component.css'
})
export class AllMenuItemsComponent implements OnInit{
  
  menuItems:MenuItems[] = []
  restaurantId!:number;
  restaurant!:Restaurants
  isAdmin!:boolean
  public filteredMenu:MenuItems[] = [];
  public searchQuery:string = '';
  imageUrl:string = faker.image.urlLoremFlickr({category: 'restaurant'});
  customerId!:number
  ratings:Ratings[] = []
  sortToggle:boolean = true;
  
  constructor(private menuItemsSevice:MenuItemsService, private restaurantService:RestaurantsService, private authService:AuthService, private customerService:CustomersService, private activated_route :ActivatedRoute, private route:Router, private ratingService:RatingsService, private popupService:PopupService) {}

  ngOnInit(): void {
    this.activated_route.params.subscribe(params => {
      this.restaurantId = params['restaurantid'];
      this.restaurantService.getRestaurantByRestaurantId(this.restaurantId).subscribe(
        (data) => {this.restaurant = data},
        (error) => console.log(error)        
      )

      this.menuItemsSevice.getMenuItemsByRestaurantId(this.restaurantId).subscribe(
        (data) => {
          this.menuItems = data;
          this.filterMenus();
        },
        (error) => console.log(error)
      )
    });

    this.authService.isAdmin().subscribe(
      (data) => {this.isAdmin = data},
      (error) => console.log(error)
    )

    let email = localStorage.getItem('userEmail');
    if(email !== null) {
      this.customerService.getCustomerByEmail(email).subscribe(
        (data) => {
          this.customerId = data.customer_id;
        },
        (error) => console.log(error)
      );
    }

    this.ratingService.getAllRatingsByRestaurantId(this.restaurantId).subscribe(
      (data) => {this.ratings = data},
      (error) => console.log(error)      
    )
  }

  filterMenus() {
    const query = this.searchQuery.toLowerCase();
    this.filteredMenu = this.menuItems.filter(menuItems =>
      menuItems.item_name.toLowerCase().includes(query)
    );
    this.sortMenuItems()
  }

  addFavoriteRestaurant() {
    this.customerService.addFavoriteRestaurant(this.customerId, this.restaurantId).subscribe(
      (data) => {
        
      },
      (error) => {this.popupService.openPopup("Added to favorites!"); console.log(error)}
    )
  }

  updateRestaurant() {
    this.route.navigate(["updaterestaurant", this.restaurantId]);
  }

  deleteRestuarant(event:Event) {
    event.stopPropagation(); // Prevent the row click event
 
    if (confirm('Are you sure you want to delete the restaurant?')) {
      this.restaurantService.deleteRestaurant(this.restaurantId).subscribe(
        (data) => {this.route.navigate(["/restaurants"])},
        (error) => console.log(error)
      )
    }
  }


 sortMenuItems(){
    if(this.sortToggle){
      this.filteredMenu = this.filteredMenu.sort((a,b)=>a.item_price-b.item_price);
      this.sortToggle = !this.sortToggle;
    }
    else{
      this.filteredMenu = this.filteredMenu.sort((a,b)=>b.item_price-a.item_price);
      this.sortToggle = !this.sortToggle;
    }
  }
}
