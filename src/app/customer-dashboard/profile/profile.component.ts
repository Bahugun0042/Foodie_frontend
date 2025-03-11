import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  customer = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, City, Country',
    phone: '+1234567890',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch customer data from the backend (if connected)
  }

  onSubmit() {
    console.log('Profile updated:', this.customer);
    // Call backend API to save changes
    alert('Profile updated successfully!');
  }
}