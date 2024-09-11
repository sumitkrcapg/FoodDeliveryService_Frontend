import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  resetPasswordForm!: FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthService, private route:Router) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      user_email:['', [Validators.required, Validators.email]],
      user_password:['', [Validators.required, Validators.min(6)]],
      confirm_user_password:['', [Validators.required, Validators.min(6)]],
    });
  }
  
  onSubmit(){
    if(this.resetPasswordForm.valid){
      const formData = this.resetPasswordForm.value;
      
      this.authService.resetPassword(formData.user_email, formData.user_password).subscribe(
        (data) => {
          if(data) {
            this.route.navigate(['/login']);
          }
          else {
            this.route.navigate(['/resetpassword']);
          }
        },
        (error) => console.log(error)
      )
    }
  }
}
