import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Restaurants } from '../../models/restaurants';
import { RestaurantsService } from '../../services/restaurants.service';
import { CommonModule } from '@angular/common';
import { SingleRestaurantComponent } from "../single-restaurant/single-restaurant.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { SamplePageComponent } from '../sample-page/sample-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterModule, SingleRestaurantComponent, ReactiveFormsModule, CarouselModule, SamplePageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  searchForm!:FormGroup
  restaurants:Restaurants[] = []
  restaurant!:Restaurants
  responsiveOptions!:any[]

  constructor(private fb:FormBuilder, private restaurantsService:RestaurantsService, private route:Router) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      restaurant_name:['', [Validators.required]]
    });

    this.restaurantsService.getAllRestaurants().subscribe(
      (data) => {this.restaurants = data},
      (error) => {console.log(error)}
    );

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  onSubmit() {
    const formData = this.searchForm.value;
    this.restaurant = this.restaurants.filter(r => r.restaurant_name.toLowerCase() === formData.restaurant_name.toLowerCase())[0];
    if(this.restaurant != null) {
      this.route.navigate(['menu', this.restaurant.restaurant_id]);
    }
    else {
      console.log("No restaurant found!");
    }
  }
}
