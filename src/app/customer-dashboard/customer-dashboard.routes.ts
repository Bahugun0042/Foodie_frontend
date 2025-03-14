import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { CprofileComponent } from './cprofile/cprofile.component';
import { CustomerDashboardComponent } from './customer-dashboard.component'; // Import CustomerDashboardComponent


export const customerDashboardRoutes: Routes = [
  { path: '', component: CustomerDashboardComponent }, // Default route
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: 'profile', component: CprofileComponent },
];