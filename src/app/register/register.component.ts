import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  role: string = ''; // No default role
  customerForm: FormGroup;
  restaurantForm: FormGroup;
  deliveryForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialize Customer Form
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      foodPreferences: [''],
    });

    // Initialize Restaurant Form
    this.restaurantForm = this.fb.group({
      restaurantName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      deliveryAreas: ['', Validators.required],
      cuisineType: ['', Validators.required],
      dishes: this.fb.array([]), // Initialize dishes as a FormArray
      openingHours: ['', Validators.required],
    });

    // Initialize Delivery Form
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      workingHours: ['', Validators.required],
    });
  }

  // Getter for dishes FormArray
  get dishes() {
    return this.restaurantForm.get('dishes') as FormArray;
  }

  // Add a new dish
  addDish() {
    const dishGroup = this.fb.group({
      dishName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      picture: ['', Validators.required],
    });
    this.dishes.push(dishGroup);
  }

  // Remove a dish
  removeDish(index: number) {
    this.dishes.removeAt(index);
  }

  // Handle role change
  onRoleChange() {
    console.log('Selected Role:', this.role);
  }

  // Handle form submission
  onSubmit() {
    alert('Form submitted!');
    alert('Form submitted: ' + this.role);
    if (this.role === 'customer' && this.customerForm.valid) {
      this.authService.registerCustomer(this.customerForm.value).subscribe({
        next: (response) => {
          console.log('Customer registered successfully:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Customer registration failed:', error);
        },
      });
    } else if (this.role === 'restaurant' && this.restaurantForm.valid) {
      this.authService.registerRestaurant(this.restaurantForm.value).subscribe({
        next: (response) => {
          console.log('Restaurant registered successfully:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Restaurant registration failed:', error);
        },
      });
    } else if (this.role === 'delivery' && this.deliveryForm.valid) {
      this.authService.registerDelivery(this.deliveryForm.value).subscribe({
        next: (response) => {
          console.log('Delivery person registered successfully:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Delivery person registration failed:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}