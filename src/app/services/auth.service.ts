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
    if (role === 'customer'){
      return this.http.post(`${this.apiUrl}/login/customer`, loginData, { headers });
  }
    else if (role === 'restaurant'){
      return this.http.post(`${this.apiUrl}/login/restaurant`, loginData, { headers });
  }
    else if( role === 'delivery'){
      return this.http.post(`${this.apiUrl}/login/delivery`, loginData, { headers });
  } else {
    throw new Error('Invalid role');
  }
  
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