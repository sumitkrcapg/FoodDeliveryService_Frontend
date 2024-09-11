import { Component, Input } from '@angular/core';
import { CartItems, MenuItems } from '../../models/menu-items';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faker } from '@faker-js/faker';
import { MenuItemsService } from '../../services/menu-items.service';

@Component({
  selector: 'app-single-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-menu-item.component.html',
  styleUrl: './single-menu-item.component.css'
})
export class SingleMenuItemComponent {

  @Input() menuItem!:MenuItems
  @Input() restaurantId!:number
  @Input() isAdmin!:boolean
  imageUrl:string = faker.image.urlLoremFlickr({category: 'food'});

  constructor(private cartService:CartService, private authService:AuthService, private menuItemService:MenuItemsService, private route:Router) {}

  addToCart(menuItem:CartItems) {
    this.authService.isAuthenticated().subscribe(
      (data) => {
        if(data === true) {
          this.cartService.addToCart(menuItem, this.restaurantId);
        }
        else {
          this.route.navigate(['/login'])
        }
      },
      (error) => console.log(error)
    )
  }

  doesPrtoductExistOnTheCart(id:number){
    return this.cartService.doesProductExistOnTheCart(id);
  }

  removeItem(item:CartItems){
    this.cartService.removeItem(item);
  }

  updateMenuItem() {
    this.route.navigate(["/updatemenuitem", this.restaurantId, this.menuItem.item_id]);
  }

  deleteMenuItem(event:Event) {
    event.stopPropagation(); // Prevent the row click event
 
    if (confirm('Are you sure you want to delete the menu item?')) {
      this.menuItemService.deleteMenuItem(this.restaurantId, this.menuItem.item_id).subscribe(
        (data) => {console.log(data); location.reload()},
        (error) => console.log(error)
      )
    }
  }
}
