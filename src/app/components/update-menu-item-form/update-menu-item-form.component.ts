import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuItemsService } from '../../services/menu-items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItems } from '../../models/menu-items';

@Component({
  selector: 'app-update-menu-item-form',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './update-menu-item-form.component.html',
  styleUrl: './update-menu-item-form.component.css'
})
export class UpdateMenuItemFormComponent {

  menuItem!:MenuItems
  updateMenuItemFrom!:FormGroup;
  restaurantId!:number

  constructor(private fb:FormBuilder, private menuItemService:MenuItemsService, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.restaurantId = params['restaurantid'];
      this.menuItemService.getMenuItemById(params['itemid']).subscribe({
        next:(data) => {
          this.menuItem = data;
          this.updateMenuItemFrom = this.fb.group({
            item_name:[this.menuItem.item_name],
            item_description:[this.menuItem.item_description],
            item_price:[this.menuItem.item_price]
          })
        }
      })
    })
  }

  onSubmit() {
    if(this.updateMenuItemFrom.valid){
      this.menuItemService.updateMenuItem(this.restaurantId, this.menuItem.item_id, this.updateMenuItemFrom.value).subscribe({
        next:(data)=> {
          this.router.navigate(["/menu", this.restaurantId]);
        },
        error:(error)=>console.log(error)
      });
    }
  }
}
