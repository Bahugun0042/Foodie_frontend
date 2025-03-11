import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { DeliveryDashboardComponent } from './delivery-dashboard/delivery-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CartComponent } from './customer-dashboard/cart/cart.component';
import { CheckoutComponent } from './customer-dashboard/checkout/checkout.component'; // Import CheckoutComponent
import { OrderTrackingComponent } from './customer-dashboard/order-tracking/order-tracking.component';
import {MenuComponent} from './restaurant-dashboard/menu/menu.component';
import {ProfileComponent} from './restaurant-dashboard/profile/profile.component';
import { OrdersComponent } from './restaurant-dashboard/orders/orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customer', component: CustomerDashboardComponent },
  { path: 'customer/cart', component: CartComponent },
  { path: 'customer/checkout', component: CheckoutComponent }, //
  {path: 'customer/order-tracking', component: OrderTrackingComponent},
  { path: 'restaurant', component: RestaurantDashboardComponent },
  { path: 'restaurant/orders', component: OrdersComponent },
  {path: 'restaurant/menu', component: MenuComponent},
  {path: 'restaurant/profile', component: ProfileComponent},
  { path: 'delivery', component: DeliveryDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: '' }, // Redirect to home for unknown routes
];