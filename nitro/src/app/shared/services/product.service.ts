import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);
  productsSignal = signal<Product[]>([]);

  loadProducts() {
    this.http.get<Product[]>('https://fakestoreapi.com/products').subscribe(products => {
      this.productsSignal.set(products);
    })
  }

  //carregar por filtro
  //fechar subscrição

}
