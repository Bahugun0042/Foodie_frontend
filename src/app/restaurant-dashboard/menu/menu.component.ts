import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service'; // Adjust the path as needed
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  orders: any[] = [];
  restaurantName: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // Fetch restaurant name from local storage
    this.restaurantName = localStorage.getItem('restaurantName') || '';

    if (this.restaurantName) {
      // Fetch orders for the restaurant
      this.orderService.getOrdersByRestaurant(this.restaurantName).subscribe({
        next: (data) => (this.orders = data),
        error: (err) => console.error('Error fetching orders:', err),
      });
    }
  }
}