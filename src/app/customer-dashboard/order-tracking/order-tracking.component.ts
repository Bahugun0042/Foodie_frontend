import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css'],
})
export class OrderTrackingComponent {
  order: any;

  constructor(private router: Router) {
    // Retrieve the order data from the navigation state
    this.order = this.router.getCurrentNavigation()?.extras.state?.['order'];
    console.log('Order Data:', this.order); // Debugging
  }
}