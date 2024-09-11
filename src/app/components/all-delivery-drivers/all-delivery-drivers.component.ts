import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { DeliveryDrivers } from '../../models/delivery-drivers';
import { DeliveryDriversService } from '../../services/delivery-drivers.service';
import { SingleDeliveryDriverComponent } from "../single-delivery-driver/single-delivery-driver.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-delivery-drivers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SingleDeliveryDriverComponent, CommonModule, FormsModule],
  templateUrl: './all-delivery-drivers.component.html',
  styleUrl: './all-delivery-drivers.component.css'
})
export class AllDeliveryDriversComponent {

  deliveryDrivers:DeliveryDrivers[] = []
  filteredDrivers:DeliveryDrivers[] = [];
  searchQuery:string = '';

  constructor(private deliveryDriverService:DeliveryDriversService) {}
 
  ngOnInit(): void {
    this.deliveryDriverService.getAllDrivers().subscribe(
      (data) => {
        this.deliveryDrivers = data;
        this.filterDrivers();
      }
    )
  }

  filterDrivers() {
    const query = this.searchQuery.toLowerCase();
    this.filteredDrivers = this.deliveryDrivers.filter(driver =>
      driver.driver_name.toLowerCase().includes(query)
    );
  }
}
