import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);
  readonly _productsSignal = signal<Product[]>([]);
  productsSignal = signal<Product[]>([]);
  categorySignal = signal<string[]>([]);

  private subscriptions = new Subscription();

  getProducts() {
    this.subscriptions.add(this.http.get<Product[]>('https://fakestoreapi.com/products').subscribe(products => {
      this._productsSignal.set(products);
      this.productsSignal.set(this._productsSignal());
    }));
  }

  getCategory() {
    this.subscriptions.add(this.http.get<string[]>('https://fakestoreapi.com/products/categories').subscribe(categories => {
      this.categorySignal.set(categories);
    }));
  }

  getProductsByCategory(category: string) {
    if (category === 'all') {
      this.productsSignal.set(this._productsSignal());
    } else {
      const filteredProducts = this._productsSignal().filter(product => product.category.toLowerCase().trim() === category.trim());
      this.productsSignal.set(filteredProducts);
    }
  }

  closeConnection() {
    this._productsSignal.set([]);
    this.categorySignal.set([]);

    this.subscriptions.unsubscribe();
  }
}
