import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories')
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/api/v1/categories/${categoryId}`)
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post('http://localhost:3000/api/v1/categories/', category)
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put('http://localhost:3000/api/v1/categories/' + category.id, category)
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`http://localhost:3000/api/v1/categories/${categoryId}`)
  }
}
