import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Create a new order
  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, order);
  }

  // Fetch orders by restaurant name
  getOrdersByRestaurant(restaurantName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/restaurant/${restaurantName}`);
  }
}