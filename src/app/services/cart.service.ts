import { Injectable } from '@angular/core';
import { Cart, CartItems, MenuItems } from '../models/menu-items';
import { BehaviorSubject, Observable } from 'rxjs';
import { CouponsService } from './coupons.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private couponService:CouponsService) {}

  private cartSubject = new BehaviorSubject<Cart>({cartItems:[], restaurantId:0});
  
  cart$ = this.cartSubject.asObservable();
  
  addToCart(item:CartItems, restaurantId:number): void {
      if(this.cartSubject.getValue().restaurantId === restaurantId) {
        this.cartSubject.next({cartItems:[...this.cartSubject.getValue().cartItems, item], restaurantId:restaurantId});
      }
      else {
        this.cartSubject.next({cartItems:[item], restaurantId:restaurantId});
      }
  }

  getCartItems(): Observable<Cart> {    
    return this.cart$;
  }

  getTotal(discount:number): number {
    const discTotal:number =  this.cartSubject.getValue().cartItems.reduce((total, item) => total + (item.item_price * item.quantity), 0);
    return discTotal - discount;
  }

  getNumProductInCart(){
    return this.cartSubject.getValue().cartItems.length;
  }

  removeItem(item:CartItems){
    this.cartSubject.next({cartItems:[...this.cartSubject.getValue().cartItems.filter((i)=>i.item_id!==item.item_id)], restaurantId:this.cartSubject.getValue().restaurantId});
  }

  doesProductExistOnTheCart(id:number){
    return this.cartSubject.getValue().cartItems.some((c)=>c.item_id===id);
  }

  getCouponByCode(code:string){
    return this.couponService.getCouponByCode(code);
  }
}
