import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartSignal = signal<Product[]>([]);

  addToCart(product: Product) {
    this.cartSignal.update(cart => [...cart, product]);
  }

  removeFromCart(productId: number) {
    this.cartSignal.update(cart => cart.filter(p => p.id !== productId))
  }

}
