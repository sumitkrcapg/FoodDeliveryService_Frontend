import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { OrdersService } from '../../services/orders.service';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../../services/auth.service';
import { CustomersService } from '../../services/customers.service';
import { Customers } from '../../models/customers';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  public orders: any[] = [];
  public filteredOrders: any[] = [];
  public searchQuery: string = '';
  public selectedOrder: any = null; // To hold the selected order details
  isAdmin!:boolean
  customer!:Customers

  constructor(private ordersService: OrdersService, private authService:AuthService, private customerService:CustomersService) { }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(
      (data) => {this.isAdmin = data},
      (error) => console.log(error)
    )

    if(this.isAdmin) {      
      this.ordersService.getOrders().subscribe(
        (data) => {
          this.orders = data;
          this.filterOrders(); // Initialize filteredOrders
      });
    }
    else {
      let email = localStorage.getItem('userEmail');

      if(email !== null) {
        this.customerService.getCustomerByEmail(email).subscribe(
          (data) => {
            this.ordersService.getOrdersByCustomerId(data.customer_id).subscribe(
              (orders) => {
                this.orders = orders;
                this.filterOrders(); // Initialize filteredOrders
              },
              (error) => console.log(error)              
            );
          },
          (error) => console.log(error)
        );
      }
    }
  }

  filterOrders(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredOrders = this.orders.filter(order =>
      order.customers.customer_name.toLowerCase().includes(query)
    );
  }

  selectOrder(order: any): void {
    this.selectedOrder = order; // Set the selected order details
  }

  updateOrderStatus(orderId: number, status: string): void {
    this.ordersService.updateOrderStatus(orderId, status).subscribe(
      (updatedOrder) => {
        // Find the index of the updated order in the orders array
        const index = this.orders.findIndex(order => order.order_id === orderId);
        if (index !== -1) {
          // Update the order in the array
          this.orders[index] = updatedOrder;
          // Re-filter the orders
          this.filterOrders();
        }
      },
      (error) => {
        console.error('Error updating order status:', error);
        // Optionally show an error message to the user
      }
    );
  }
 
  cancelOrder(orderId: number, event: Event): void {
    event.stopPropagation(); // Prevent the row click event
 
    if (confirm('Are you sure you want to cancel this order?')) {
      this.ordersService.cancelOrder(orderId).subscribe(
        () => {
          // Remove the canceled order from the local list
          this.orders = this.orders.filter(order => order.order_id !== orderId);
          this.filterOrders(); // Re-filter the orders
        },
        (error) => {
          console.error('Error canceling order:', error);
          // Optionally show an error message to the user
        }
      );
    }
  }

  downloadPDF(): void {
    if (!this.selectedOrder) {
      return; // Ensure an order is selected
    }

    const pdf = new jsPDF();

    // Add title
    pdf.setFontSize(18);
    pdf.text('Order Details', 14, 22);

    // Add order details
    pdf.setFontSize(12);
    pdf.text(`Order ID: ${this.selectedOrder.order_id}`, 14, 30);
    pdf.text(`Order Date: ${new Date(this.selectedOrder.order_date).toLocaleDateString()}`, 14, 38);
    pdf.text(`Status: ${this.selectedOrder.order_status}`, 14, 46);
    pdf.text(`Customer Name: ${this.selectedOrder.customers.customer_name}`, 14, 54);
    pdf.text(`Customer Email: ${this.selectedOrder.customers.customer_email}`, 14, 62);
    pdf.text(`Customer Phone: ${this.selectedOrder.customers.customer_phone}`, 14, 70);
    pdf.text(`Restaurant Name: ${this.selectedOrder.restaurants.restaurant_name}`, 14, 78);
    pdf.text(`Restaurant Address: ${this.selectedOrder.restaurants.restaurant_address}`, 14, 86);
    pdf.text(`Restaurant Phone: ${this.selectedOrder.restaurants.restaurant_phone}`, 14, 94);
    pdf.text(`Driver Name: ${this.selectedOrder.deliveryDrivers.driver_name}`, 14, 102);
    pdf.text(`Driver Phone: ${this.selectedOrder.deliveryDrivers.driver_phone}`, 14, 110);
    pdf.text(`Driver Vehicle: ${this.selectedOrder.deliveryDrivers.driver_vehicle}`, 14, 118);

    // Save the PDF
    pdf.save('order-details.pdf');
  }
}
