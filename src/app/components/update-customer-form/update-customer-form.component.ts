import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Customers } from '../../models/customers';

@Component({
  selector: 'app-update-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, HeaderComponent],
  templateUrl: './update-customer-form.component.html',
  styleUrl: './update-customer-form.component.css'
})
export class UpdateCustomerFormComponent {

  updateCustomerForm!: FormGroup;
  customer!:Customers

  constructor(private fb:FormBuilder, private customerService:CustomersService, private route:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.customerService.getCustomerById(params['id']).subscribe({
        next:(data) => {
          this.customer = data;
          this.updateCustomerForm = this.fb.group({
            customer_name:[this.customer.customer_name],
            customer_email:[this.customer.customer_email],
            customer_phone:[this.customer.customer_phone]
          })
        }
      })
    })
  }
  
  onSubmit(){
    if(this.updateCustomerForm.valid) {
      const formData = this.updateCustomerForm.value;
      const customerData = {customer_id:this.customer.customer_id, customer_name:formData.customer_name, customer_email:formData.customer_email, customer_phone:formData.customer_phone, customer_password:this.customer.customer_password, customer_role:this.customer.customer_role}
      this.customerService.updateCustomer(this.customer.customer_id, customerData).subscribe(
        (data) => {
          this.route.navigate(['/profile', data.customer_id])
        },
        (error) => console.log(error)
      );
    }
  }
}
