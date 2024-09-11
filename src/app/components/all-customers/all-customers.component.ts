import { Component } from '@angular/core';
import { Customers } from '../../models/customers';
import { CustomersService } from '../../services/customers.service';
import { CommonModule } from '@angular/common';
import { SingleCustomerComponent } from '../single-customer/single-customer.component';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, SingleCustomerComponent, HeaderComponent, FooterComponent],
  templateUrl: './all-customers.component.html',
  styleUrl: './all-customers.component.css'
})
export class AllCustomersComponent {

  customers:Customers[] = []
  filteredCustomers:Customers[] = [];
  searchQuery:string = '';

  constructor(private customerService:CustomersService) {}
 
  ngOnInit(): void {
    this.customerService.getAllCustomer().subscribe(
      (data) => {
        this.customers = data;
        this.filterCustomers();
      },
      (error) => console.log(error)
    )
  }

  filterCustomers() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer =>
      customer.customer_name.toLowerCase().includes(query)
    );
  }
}
