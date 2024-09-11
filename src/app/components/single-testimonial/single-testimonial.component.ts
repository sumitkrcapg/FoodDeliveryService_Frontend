import { Component, Input } from '@angular/core';
import { Ratings } from '../../models/ratings';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-single-testimonial',
  standalone: true,
  imports: [],
  templateUrl: './single-testimonial.component.html',
  styleUrl: './single-testimonial.component.css'
})
export class SingleTestimonialComponent {

  @Input() rating!:Ratings
  imageUrl:string = faker.image.urlLoremFlickr({category: 'human'});
}
