import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = '';
  errorMessage='';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password, this.role).subscribe({
      next: (response) => {

        // Navigate to respective dashboards based on role
        if (response.role === 'customer') {
          console.log('Login successful:', response); // Store JWT token
          localStorage.setItem('userId', response.userId);    // Store unique user ID
          localStorage.setItem('name', response.name);    // Store unique user ID
          localStorage.setItem('role', response.role); 
          console.log('Stored name:', localStorage.getItem('name'));
          console.log('Stored userId:', localStorage.getItem('userId'));
          console.log('Stored role:', localStorage.getItem('role')); 
          this.router.navigate(['/customer']);
        } else if (response.role === 'restaurant') {
          console.log('Login successful:', response); // Store JWT token
          localStorage.setItem('restaurantId', response.restaurantId);    // Store unique user ID
          localStorage.setItem('restaurantName', response.restaurantName);    // Store unique user ID
          localStorage.setItem('role', response.role); 
          console.log('Stored name:', localStorage.getItem('restaurantName'));
          console.log('Stored userId:', localStorage.getItem('restaurantId'));
          console.log('Stored role:', localStorage.getItem('role')); 
          this.router.navigate(['/restaurant']);
        } else if (response.role === 'delivery') {
          console.log('Login successful:', response); // Store JWT token
          localStorage.setItem('deliveryId', response.deliveryId);    // Store unique user ID
          localStorage.setItem('deliveryName', response.deliveryName);    // Store unique user ID
          localStorage.setItem('role', response.role); 
          console.log('Stored name:', localStorage.getItem('deliveryName'));
          console.log('Stored userId:', localStorage.getItem('deliveryId'));
          console.log('Stored role:', localStorage.getItem('role')); 
          this.router.navigate(['/delivery']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid credentials. Please try again.');
      },
    });
  }

  navigate() {
    this.router.navigate(['/register']);
  }
}
