import { Routes } from '@angular/router';
import { RestaurantDashboardComponent } from './restaurant-dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { RprofileComponent } from './rprofile/rprofile.component';

export const restaurantDashboardRoutes: Routes = [
      { path: '', component: RestaurantDashboardComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'profile', component: RprofileComponent },
      { path: '', redirectTo: 'menu', pathMatch: 'full' }, 
];