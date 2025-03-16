import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css'],
})
export class OrderTrackingComponent {
  order: any = null;

  constructor(private router: Router) {
    // Retrieve order data from navigation state
    this.order = this.router.getCurrentNavigation()?.extras.state?.['order'];

    if (this.order) {
      localStorage.setItem('order', JSON.stringify(this.order)); // Store order in localStorage
    } else {
      // Retrieve from localStorage (for page refresh cases)
      const savedOrder = localStorage.getItem('order');
      this.order = savedOrder ? JSON.parse(savedOrder) : null;
    }

    console.log('Order Data:', this.order);
  }
}