import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<{ dish: any; quantity: number }[]>([]);
  currentCartItems = this.cartItems.asObservable();

  // Method to generate a unique key for a dish
  generateUniqueKey(dish: any): string {
    return `${dish.dishName}-${dish.restaurantName}`; // Combine dishName and restaurantName
  }

  addToCart(dish: any) {
    const currentItems = this.cartItems.getValue();
    const uniqueKey = this.generateUniqueKey(dish); // Generate a unique key for the dish
    const existingItem = currentItems.find((item) => this.generateUniqueKey(item.dish) === uniqueKey); // Use the unique key for comparison

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if the dish already exists
    } else {
      currentItems.push({ dish, quantity: 1 }); // Add new dish to the cart
    }

    this.cartItems.next([...currentItems]); // Update the cart items
    console.log('Cart Items:', currentItems); // Log the updated cart items
  }

removeFromCart(dish: any) {
  const currentItems = this.cartItems.getValue();
  const uniqueKey = this.generateUniqueKey(dish); // Generate a unique key for the dish
  const updatedItems = currentItems.filter((item) => this.generateUniqueKey(item.dish) !== uniqueKey); // Use the unique key for comparison
  this.cartItems.next(updatedItems); // Update the cart items
  console.log('Cart Items after removal:', updatedItems); // Log the updated cart items
}

  increaseQuantity(dish: any) {
    const currentItems = this.cartItems.getValue();
    const item = currentItems.find((item) => item.dish.id === dish.id);

    if (item) {
      item.quantity += 1;
      this.cartItems.next([...currentItems]);
    }
  }

  decreaseQuantity(dish: any) {
    const currentItems = this.cartItems.getValue();
    const item = currentItems.find((item) => item.dish.id === dish.id);

    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1; // Decrease quantity if greater than 1
      } else {
        // Remove the item if quantity is 1
        this.removeFromCart(dish);
      }
      this.cartItems.next([...currentItems]);
    }
  }
  // Clear the cart
  clearCart() {
    this.cartItems.next([]); // Reset the cart to an empty array
  }

  // Get the current cart items
  getCartItems() {
    return this.cartItems.getValue(); // Return the current value of cartItems
  }
  // Get the total number of items in the cart
  getCartItemCount() {
    return this.cartItems.getValue().reduce((total, item) => total + item.quantity, 0);
  }
}