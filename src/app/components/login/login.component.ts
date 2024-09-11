import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  isValid!:boolean;

  constructor(private fb:FormBuilder, private authService:AuthService, private route:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user_email:['', [Validators.required, Validators.email]],
      user_password:['', [Validators.required, Validators.min(6)]],
      rememberMe:[false]
    });
  }
  
  onSubmit(){
    if(this.loginForm.valid){
      const formData = this.loginForm.value;
      this.authService.login(formData);
    }
  }
}