import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isAdmin!:boolean
  isAuthenticated!:boolean

  constructor(private route:Router, private customerService:CustomersService, private authService:AuthService, private cartService:CartService) {}

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(
      (data) => {this.isAdmin = data},
      (error) => console.log(error)
    )
    this.authService.isAuthenticated().subscribe(
      (data) => {this.isAuthenticated = data},
      (error) => console.log(error)
    )
  }

  handleClick() {
    this.route.navigate(['/restaurants'])
  }

  getUserProfile() {
    let email = localStorage.getItem('userEmail');
    
    if(email !== null) {
      this.customerService.getCustomerByEmail(email).subscribe(
        (data) => {this.route.navigate(['profile', data.customer_id]);},
        (error) => console.log(error)
      )
    }
  }

  getNumProductInCart() {
    return this.cartService.getNumProductInCart();
  }
}
