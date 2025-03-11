import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
      otherbranches: ['', Validators.required],
      cuisineType: ['', Validators.required],
      dishes: this.fb.array([]), // Initialize dishes as a FormArray
      openingHours: ['', Validators.required],
      paymentMethods: ['', Validators.required]
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
      deliveryAreas: ['', Validators.required]
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
      price: ['', Validators.required]
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
    if (this.role === 'customer' && this.customerForm.valid) {
      console.log('Customer Form Submitted:', this.customerForm.value);
    } else if (this.role === 'restaurant' && this.restaurantForm.valid) {
      console.log('Restaurant Form Submitted:', this.restaurantForm.value);
    } else if (this.role === 'delivery' && this.deliveryForm.valid) {
      console.log('Delivery Form Submitted:', this.deliveryForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}