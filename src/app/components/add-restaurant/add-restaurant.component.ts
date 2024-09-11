import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RestaurantsService } from '../../services/restaurants.service';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent implements OnInit{
  addRestaurantFrom!:FormGroup;

  constructor(private fb:FormBuilder, private restaurantService:RestaurantsService, private router:Router){}

  ngOnInit(): void {
    this.addRestaurantFrom = this.fb.group({
      restaurant_name:['', Validators.required],
      restaurant_address:['', Validators.required],
      restaurant_phone:['', Validators.required]
    });
  }

  onSubmit(){
    if(this.addRestaurantFrom.valid){
      const formData=this.addRestaurantFrom.value;
      const restaurantData = {
        restaurant_id: 100,
        restaurant_name: formData.restaurant_name,
        restaurant_address: formData.restaurant_address,
        restaurant_phone: formData.restaurant_phone
      }
      
      this.restaurantService.addRestaurant(restaurantData).subscribe({
        next:(data)=> {
          this.router.navigate(["/restaurants"]);
        },
        error:(error)=>console.log(error)
      });
    }
  }
}
