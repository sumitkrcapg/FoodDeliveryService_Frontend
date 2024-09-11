import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  signupForm!: FormGroup;
  
  constructor(private fb:FormBuilder, private customerService:CustomersService, private authService:AuthService, private route:Router){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:['', Validators.required],
      password:['', [Validators.required, Validators.min(6)]],
      repeatpassword:['', [Validators.required, Validators.min(6)]]
    });
  }
  
  onSubmit(){
    if(this.signupForm.valid){
      const formData = this.signupForm.value;
      const customerData = {customer_id:54, customer_name:formData.name, customer_email:formData.email, customer_phone:formData.phone, customer_password:formData.password, customer_role:"customer"}
      this.customerService.addCustomer(customerData).subscribe(
        (data) => {
          this.authService.login({user_email:customerData.customer_email, user_password:customerData.customer_password});
        },
        (error) => console.log(error)
      );
    }
  }
}
