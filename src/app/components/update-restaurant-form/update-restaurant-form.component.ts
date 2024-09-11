import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantsService } from '../../services/restaurants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurants } from '../../models/restaurants';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-restaurant-form',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './update-restaurant-form.component.html',
  styleUrl: './update-restaurant-form.component.css'
})
export class UpdateRestaurantFormComponent {

  restaurant!:Restaurants
  addRestaurantFrom!:FormGroup;

  constructor(private fb:FormBuilder, private restaurantService:RestaurantsService, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.restaurantService.getRestaurantByRestaurantId(params['id']).subscribe({
        next:(data) => {
          this.restaurant = data;
          this.addRestaurantFrom = this.fb.group({
            restaurant_name:[this.restaurant.restaurant_name],
            restaurant_address:[this.restaurant.restaurant_address],
            restaurant_phone:[this.restaurant.restaurant_phone]
          })
        }
      })
    })
  }

  onSubmit() {
    if(this.addRestaurantFrom.valid){
      this.restaurantService.updateRestaurant(this.restaurant.restaurant_id,this.addRestaurantFrom.value).subscribe({
        next:(data)=> {
          this.router.navigate(["/menu", this.restaurant.restaurant_id]);
        },
        error:(error)=>console.log(error)
      });
    }
  }
}
