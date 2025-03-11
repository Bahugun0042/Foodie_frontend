import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<{ dish: any; quantity: number }[]>([]);
  currentCartItems = this.cartItems.asObservable();

 
  addToCart(dish: any) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find((item) => item.dish.id === dish.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ dish, quantity: 1 });
    }

    this.cartItems.next([...currentItems]);
  }

  removeFromCart(dish: any) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter((item) => item.dish.id !== dish.id);
    this.cartItems.next(updatedItems);
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