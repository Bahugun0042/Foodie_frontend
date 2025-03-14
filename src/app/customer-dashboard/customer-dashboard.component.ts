import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Import RouterOutlet
import { CartService } from '../services/cart.service'; // Import CartService

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterOutlet],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent {
  searchQuery: string = '';
  cartItemCount: number = 0;
  userName: string = '';
  dishes = [
    {
      id: 1,
      name: 'Pasta',
      description: 'Creamy Alfredo Pasta',
      price: 12.99,
      restaurant: 'Italian Bistro',
      image: 'https://www.spicebangla.com/wp-content/uploads/2024/08/Spicy-Pasta-recipe-optimised-scaled.webp',
    },
    {
      id: 2,
      name: 'Pizza',
      description: 'Margherita Pizza',
      price: 10.99,
      restaurant: 'Italian Bistro',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1200px-Pizza-3007395.jpg',
    },
    {
      id: 3,
      name: 'Fried Rice',
      description: 'Vegetable Fried Rice',
      price: 8.99,
      restaurant: 'Chinese Delight',
      image: 'https://cicili.tv/wp-content/uploads/2024/08/Chicken-Fried-Rice-Small-2-1200x900.jpg',
    },
    {
      id: 4,
      name: 'Chicken Nuggets',
      description: 'Crispy Chicken Nuggets',
      price: 7.99,
      restaurant: 'Chinese Delight',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYhpejycIfIM0TsLnAJJnkGTMqOxsuAq_cw&s',
    },
    {
      id: 5,
      name: 'French Fries',
      description: 'Aloo chips with tomato ketchup',
      price: 4.99,
      restaurant: 'SS Makers',
      image: 'https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg',
    },
    {
      id: 6,
      name: 'Butter Chicken',
      description: 'Creamy butter chicken served with naan',
      price: 14.99,
      restaurant: 'Indian Tandoor',
      image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/butter-chicken.jpg',
    },
    {
      id: 7,
      name: 'Biryani',
      description: 'Spicy Hyderabadi Chicken Biryani',
      price: 15.99,
      restaurant: 'Indian Tandoor',
      image: 'https://static.wixstatic.com/media/c47167_4e575594ceab4c95b6d3ad001890c0c7~mv2.webp/v1/fill/w_568,h_378,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c47167_4e575594ceab4c95b6d3ad001890c0c7~mv2.webp',
    },
    {
      id: 8,
      name: 'Sushi',
      description: 'Assorted sushi platter with wasabi',
      price: 18.99,
      restaurant: 'Tokyo Sushi House',
      image: 'https://www.allrecipes.com/thmb/i7yLualeJp6h7nuux-Dnr7AUI6o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4559474-vegetarian-sushi-Buckwheat-Queen-4x3-1-af11cac7218240e383dbe72ef6b1ec8f.jpg',
    },
    {
      id: 9,
      name: 'Burger',
      description: 'Cheesy Beef Burger with lettuce and tomato',
      price: 9.99,
      restaurant: 'Burger Hub',
      image: 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
    },
    {
      id: 10,
      name: 'Tacos',
      description: 'Mexican-style tacos with beef and salsa',
      price: 11.99,
      restaurant: 'Mexican Fiesta',
      image: 'https://danosseasoning.com/wp-content/uploads/2022/03/Beef-Tacos-1024x767.jpg',
    },
    {
      id: 11,
      name: 'Momos',
      description: 'Steamed chicken momos with spicy chutney',
      price: 6.99,
      restaurant: 'Tibetan Delights',
      image: 'https://www.cookforindia.com/wp-content/uploads/2016/02/Momos-snap.jpg',
    },
    {
      id: 12,
      name: 'Pancakes',
      description: 'Fluffy pancakes with maple syrup and butter',
      price: 7.49,
      restaurant: 'Breakfast Corner',
      image: 'https://www.marthastewart.com/thmb/Vgb9cQSlegZz5fcoSbkkqyHPmHY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/338185-basic-pancakes-09-00b18f8418fd4e52bb2050173d083d04.jpg',
    },
    {
      id: 13,
      name: 'Chocolate Brownie',
      description: 'Rich chocolate brownie with vanilla ice cream',
      price: 5.99,
      restaurant: 'Sweet Treats',
      image: 'https://recipesblob.oetker.in/assets/9a89b75f976642dcab8ae407e2f4344e/1272x764/chocolate-brownie.webp',
    },
    {
      id: 14,
      name: 'Ice Cream Sundae',
      description: 'Vanilla ice cream topped with chocolate syrup and nuts',
      price: 6.49,
      restaurant: 'Sweet Treats',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CffOS02U3F9cMjhoIwjaP-23EAFULYd0Cw&s',
    }
  ]
  ;
  filteredDishes = this.dishes;
  constructor(private router: Router, private cartService: CartService) {
    // Initialize cart item count
    this.userName = localStorage.getItem('name') || 'Geust'; // Get user name from local storage
    alert('Welcome ' + this.userName);
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  onSearch() {
    this.filteredDishes = this.dishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        dish.restaurant.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addToCart(dish: any) {
    console.log('Adding dish to cart:', dish); // Debugging
    this.cartService.addToCart(dish); // Add dish to cart
    this.cartItemCount = this.cartService.getCartItemCount(); // Update cart item count
  }

  navigateToCart() {
    this.router.navigate(['/customer/cart']);
  }
  logout() { // Remove authentication token
    localStorage.removeItem('userId');    // Remove user ID
    localStorage.removeItem('role');      // Remove user role
    this.router.navigate(['/login']);     // Redirect to login
  }
}