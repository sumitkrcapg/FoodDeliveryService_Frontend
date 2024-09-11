import { Component, OnInit } from '@angular/core';
import { Cart, CartItems, MenuItems } from '../../models/menu-items';
import { CommonModule } from '@angular/common';
import { Coupons } from '../../models/coupons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CouponsService } from '../../services/coupons.service';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CustomersService } from '../../services/customers.service';
import { OrdersService } from '../../services/orders.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PopupService } from '../../services/popup.service';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems$!: Cart
  cartItem!: MenuItems[]
  coupon!:Coupons
  total!:number
  discount:number = 0
  couponForm!:FormGroup
  customerId!:number
  imageUrl:string = faker.image.urlLoremFlickr({category: 'food'});
  sortToggle:boolean = false;

  constructor(private fb:FormBuilder, private cartService:CartService, private couponService:CouponsService, private customerService:CustomersService, private orderService:OrdersService, private route:Router, private popupService:PopupService) {}
  
  ngOnInit(): void {
    this.getCartItems()
    this.couponForm = this.fb.group({
      couponCode:['']
    })

    let email = localStorage.getItem('userEmail');
    if(email !== null) {
      this.customerService.getCustomerByEmail(email).subscribe(
        (data) => {this.customerId = data.customer_id},
        (error) => console.log(error)
      );
    }
  }

  getCartItems() {
    return this.cartService.getCartItems().subscribe({
      next:(data)=>{this.cartItems$=data;}
    });
    this.sortMenuItems()
  }

  getTotal(discount:number):number {
    this.total = this.cartService.getTotal(discount)
    return parseFloat(this.total.toFixed(2)) ;
  }

  removeItem(item:CartItems) {
    this.cartService.removeItem(item);
  }

  getCouponByCode(code:string) {
     this.couponService.getCouponByCode(code).subscribe(
      (data) => {
        if(this.total >= data.discount_amount) {
          this.coupon = data;
          this.discount = this.coupon.discount_amount;
          this.total = this.getDiscountedPrice();
        }
      },
      (error) => console.log(error)
    )
  }

  getDiscountedPrice() {
    if(this.getTotal(this.discount) > 100) {
      this.total = this.getTotal(this.discount) - this.discount;
    }
    else {
      console.log('total less 100', this.total);
    }
    
    return this.total;
  }

  onSubmit() {
    const coupon = this.couponForm.value;
    this.getCouponByCode(coupon.couponCode);

    if(this.getCouponByCode(coupon.couponCode) === null) {
      alert('invalid coupon code')
    }
  }

  placeOrder() {
    const driverId = Math.floor(Math.random() * (50)) + 1;
    console.log(this.cartItems$.restaurantId);
    
    this.orderService.placeOrder(this.customerId, this.cartItems$.restaurantId, driverId).subscribe(
      (data) => {
        this.cartItems$.cartItems.splice(0, this.cartItems$.cartItems.length);
        this.playSound();
        this.popupService.openPopup("Order placed successfully");
        this.route.navigate(['/orders'])
      },
      (error) => console.log(error)
    )
  }

  updateQuantity(item:CartItems, quantity:number){
    item.quantity = quantity;
  }

  playSound() {
    let audio = new Audio();
    audio.src = "sounds/orderplaced.mp3";
    audio.load();
    audio.play();
  }

  sortMenuItems(){
    if(this.sortToggle){
      this.cartItems$.cartItems = this.cartItems$.cartItems.sort((a,b)=>a.item_price-b.item_price);
      this.sortToggle = !this.sortToggle;
    }
    else{
      this.cartItems$.cartItems = this.cartItems$.cartItems.sort((a,b)=>b.item_price-a.item_price);
      this.sortToggle = !this.sortToggle;
    }
  }

  textToCopy: string = 'SAVE20';  // Property bound to the input field
  buttonText: string = 'COPY';  // Initial button text

  copyIt() {
    // Get the input element
    const copyInput = document.getElementById('copyvalue') as HTMLInputElement;

    // Select the text in the input field
    copyInput.select();

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Update the button text
    this.buttonText = 'COPIED';
  }
}
