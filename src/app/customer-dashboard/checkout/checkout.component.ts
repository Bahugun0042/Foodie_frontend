import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { loadStripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { OrderService } from '../../services/order.service'; // Import OrderService

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  stripe: any;
  elements: StripeElements | undefined;
  card: StripeCardElement | undefined;

  cartItems: { dish: any; quantity: number }[] = [];
  deliveryAddress: string = '';
  paymentMethod: string = 'credit-card';
  cardError: string = '';
  isProcessing: boolean = false;
  paymentSuccess: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService, // Inject OrderService
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Get cart items from the service
    this.cartItems = this.cartService.getCartItems();
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Initializing Stripe...'); // Debugging
      await this.initializeStripe();
    }
  }

  async initializeStripe() {
    try {
      // Load Stripe.js
      this.stripe = await loadStripe('pk_test_51R0ru1GHm6069Z1nL6UUJoI926avGZrZr3dX8nuq0VTiJ1YGMfsepQeFJ5gD5LMudWMEE7HnuPKOwDJZ0Hw5GO7U00IROAUD3W');
      console.log('Stripe loaded:', this.stripe); // Debugging

      if (this.stripe) {
        this.elements = this.stripe.elements();
        console.log('Stripe Elements initialized:', this.elements); // Debugging

        if (this.elements) {
          this.card = this.elements.create('card');
          this.mountCardElement();
        } else {
          console.error('Stripe Elements could not be initialized.');
        }
      } else {
        console.error('Stripe.js could not be loaded.');
      }
    } catch (error) {
      console.error('Error loading Stripe.js:', error); // Debugging
    }
  }

  mountCardElement() {
    if (isPlatformBrowser(this.platformId)) {
      const cardElement = document.getElementById('card-element');
      if (cardElement && this.card) {
        this.card.mount('#card-element');
        console.log('Card Element mounted.'); // Debugging
      } else {
        console.error('Card Element or #card-element div not found.'); // Debugging
      }
    }
  }

  unmountCardElement() {
    if (isPlatformBrowser(this.platformId) && this.card) {
      this.card.unmount(); // Unmount the Card Element
      console.log('Card Element unmounted.'); // Debugging
    }
  }

  onPaymentMethodChange() {
    if (this.paymentMethod === 'credit-card' || this.paymentMethod === 'debit-card') {
      this.mountCardElement(); // Mount the Card Element
    } else {
      this.unmountCardElement(); // Unmount the Card Element
    }
  }

  // Calculate the total price of items in the cart
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.dish.price * item.quantity, 0);
  }

  // Confirm the order
  async confirmOrder() {
    this.isProcessing = true;
    this.cardError = '';

    if (this.paymentMethod === 'credit-card' || this.paymentMethod === 'debit-card') {
      try {
        const { error, paymentMethod } = await this.stripe.createPaymentMethod({
          type: 'card',
          card: this.card,
        });

        if (error) {
          this.cardError = error.message;
          this.isProcessing = false;
          return;
        }

        console.log('Payment Method:', paymentMethod);
      } catch (error) {
        this.cardError = 'Payment failed. Please check your card details.';
        this.isProcessing = false;
        return;
      }
    }

    // Fetch customerId from local storage
    const customerId = localStorage.getItem('userId');

    if (!customerId) {
      console.error('Customer ID not found in local storage');
      this.isProcessing = false;
      return;
    }

    // Create the order object
    const order = {
      customerId: customerId, // Include customerId
      items: this.cartItems,
      deliveryAddress: this.deliveryAddress,
      paymentMethod: this.paymentMethod,
      totalPrice: this.getTotalPrice(),
      status: 'Order Placed', // Initial status
      createdAt: new Date().toISOString(), // Add a timestamp
    };

    console.log('Order confirmed:', order); // For debugging

    // Send the order to the backend
    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        console.log('Order created:', response);
        this.paymentSuccess = true;
        this.cartService.clearCart(); // Clear the cart
        setTimeout(() => {
          this.router.navigate(['/customer/order-tracking'], { state: { order: response } });
        }, 2000);
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.isProcessing = false;
      },
    });
  }
}