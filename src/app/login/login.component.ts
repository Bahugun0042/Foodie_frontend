import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Add FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {} // Inject Router

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Add login logic here
  }

  navigate() {
    this.router.navigate(['/register']); // Use Router to navigate
  }
}