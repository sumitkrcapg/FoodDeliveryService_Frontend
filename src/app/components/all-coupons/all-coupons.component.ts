import { Component, OnInit } from '@angular/core';
import { CouponsService } from '../../services/coupons.service';
import { Coupons } from '../../models/coupons';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-all-coupons',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './all-coupons.component.html',
  styleUrl: './all-coupons.component.css'
})
export class AllCouponsComponent implements OnInit {

  coupons:Coupons[] = []

  constructor(private couponsService:CouponsService) {}

  ngOnInit(): void {
    this.couponsService.getAllCoupons().subscribe(
      (data) => {this.coupons = data},
      (error) => console.log(error)
    )
  }

  textToCopy: string = '';  // Property bound to the input field
  buttonText: string = 'COPY';  // Initial button text

  copyIt(couponId:number) {
    // Get the input element
    const copyInput = document.getElementById(couponId.toString()) as HTMLInputElement;

    // Select the text in the input field
    copyInput.select();

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Update the button text
    this.buttonText = 'COPIED';
  }
}