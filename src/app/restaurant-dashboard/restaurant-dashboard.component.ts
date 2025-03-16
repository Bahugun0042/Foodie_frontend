import { Component } from '@angular/core';
import { Router ,RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-restaurant-dashboard',
  imports: [RouterOutlet],
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css'],
})
export class RestaurantDashboardComponent {
  constructor(private router: Router) {}

  // Logout function
  logout() {
    localStorage.removeItem('restaurantId'); // Clear restaurant ID from local storage
    localStorage.removeItem('restaurantName'); // Clear restaurant ID from local storage
    localStorage.removeItem('role'); // Clear restaurant ID from local storage
    this.router.navigate(['/login']); // Redirect to login page
  }

navigateToMenu(){
  this.router.navigate(['/restaurant/menu']);
}
navigateToOrders(){
  this.router.navigate(['/restaurant/orders']);

}
}