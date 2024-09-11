import { Component, Input, OnInit } from '@angular/core';
import { Ratings } from '../../models/ratings';
import { RestaurantsService } from '../../services/restaurants.service';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { SingleTestimonialComponent } from "../single-testimonial/single-testimonial.component";
import { RatingsService } from '../../services/ratings.service';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule, CarouselModule, SingleTestimonialComponent],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent implements OnInit {
  
  @Input() ratings!:Ratings[];
  responsiveOptions!:any[]

  constructor() {}

  ngOnInit(): void {
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
}
