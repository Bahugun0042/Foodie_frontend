import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dish {
    id:string;
    dishName: string;
    description: string;
    price: number;
    picture: string;
    restaurantName: string;
  }

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private apiUrl = 'http://localhost:8080/api/restaurants/dishes';

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }
}