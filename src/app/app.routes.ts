import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { DeliveryDashboardComponent } from './delivery-dashboard/delivery-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'customer', 
    loadChildren: () => import('./customer-dashboard/customer-dashboard.routes').then(m => m.customerDashboardRoutes)
  },
  { path: 'restaurant', component: RestaurantDashboardComponent },
  { path: 'delivery', component: DeliveryDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: '' }, // Redirect to home for unknown routes
];