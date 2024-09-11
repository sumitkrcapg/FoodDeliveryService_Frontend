import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItemsService } from '../../services/menu-items.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-add-menu-items',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './add-menu-items.component.html',
  styleUrl: './add-menu-items.component.css'
})
export class AddMenuItemsComponent implements OnInit{
  addMenuItemForm!:FormGroup
  
  constructor(private fb:FormBuilder, private menuItemsService:MenuItemsService,private router:Router){}

  ngOnInit(): void {
    this.addMenuItemForm = this.fb.group({
      item_name:['', Validators.required],
      item_description:['', Validators.required],
      item_price:['', Validators.required],
      restaurant_id:['', Validators.required]
    });
  }

  onSubmit(){
    if(this.addMenuItemForm.valid){
      const formData = this.addMenuItemForm.value;
      this.menuItemsService.addMenuItem(formData).subscribe({
        next:(data)=> {
          this.router.navigate(["/menu", formData.restaurant_id]);
        },
        error:(error)=>console.log(error)
      });
    }
  }
}
