import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: { dish: any; quantity: number }[] = [];

  constructor(private cartService: CartService, private router: Router) {
    // Subscribe to cart items
    this.cartService.currentCartItems.subscribe((items) => {
      this.cartItems = items;
    });
  }

  // Increase the quantity of a dish
  increaseQuantity(dish: any) {
    this.cartService.increaseQuantity(dish);
  }

  // Decrease the quantity of a dish
  decreaseQuantity(dish: any) {
    this.cartService.decreaseQuantity(dish);
  }

  // Remove a dish from the cart
  removeFromCart(dish: any) {
    this.cartService.removeFromCart(dish);
  }

  // Calculate the total price of items in the cart
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.dish.price * item.quantity, 0);
  }

  // Navigate to the checkout page
  checkout() {
    this.router.navigate(['/customer/checkout']);
  }
}