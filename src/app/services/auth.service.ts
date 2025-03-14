import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}


  login(email: string, password: string, role: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const loginData = { email, password, role };
    return this.http.post(`${this.apiUrl}/login`, loginData, { headers });
  }
  

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`);
  }

  registerCustomer(customerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/customer`, customerData);
  }

  registerRestaurant(restaurantData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/restaurant`, restaurantData);
  }

  registerDelivery(deliveryData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/delivery`, deliveryData);
  }
}