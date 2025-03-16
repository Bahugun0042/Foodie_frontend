import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DishService, Dish } from '../services/dish.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
  searchQuery: string = '';
  dishes: Dish[] = [];
  cartItemCount: number = 0;
  userName: string = '';
  filteredDishes: Dish[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private dishService: DishService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('name') || '';
      console.log('User Name:', this.userName);
      alert('Welcome ' + this.userName);
    }

    this.cartItemCount = this.cartService.getCartItemCount();
    this.fetchDishes(); // Call fetchDishes() to load dishes
  }

  fetchDishes() {
    this.dishService.getAllDishes().subscribe({
      next: (dishes: Dish[]) => {
        this.dishes = dishes;
        this.filteredDishes = [...this.dishes]; // Update filteredDishes with the fetched dishes
      },
      error: (error) => {
        console.error('Error fetching dishes:', error);
      },
    });
  }

  onSearch() {
    this.filteredDishes = this.dishes.filter((dish) =>
      dish.dishName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      dish.restaurantName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addToCart(dish: any) {
    this.cartService.addToCart(dish);
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  navigateToCart() {
    this.router.navigate(['/customer/cart']);
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }
}