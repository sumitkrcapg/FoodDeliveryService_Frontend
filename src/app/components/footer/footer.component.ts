import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  currentYear!:number
  
  ngOnInit(): void {
    let date = new Date();
    this.currentYear = date.getFullYear();
  }
}
