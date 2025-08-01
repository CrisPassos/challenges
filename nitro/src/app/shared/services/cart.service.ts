import { effect, Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

const CART_KEY = 'cart_items';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Save into Local Storage
  private isBrowser = typeof localStorage !== 'undefined';

  private initialCart: CartItem[] = this.isBrowser
    ? JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    : [];

  cartSignal = signal<CartItem[]>(this.initialCart);

  constructor() {
    if (this.isBrowser) {
      effect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(this.cartSignal()));
      });
    }
  }

  addToCart(product: Product, quantity: number) {
    this.cartSignal.update(cart => {
      //search product
      const index = cart.findIndex(item => item?.product?.id === product.id);

      //if we already have it just updated the quantity
      if (index != -1) {
        const updated = [...cart];

        updated[index] = {
          product,
          quantity: updated[index].quantity + 1
        }

        return updated
      }

      return [...cart, { product, quantity }]

    });
  }

  removeFromCart(productId: number) {
    this.cartSignal.update(cart => cart.filter(p => p?.product?.id !== productId))
  }

  updatedQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId)
      return;
    }

    this.cartSignal.update(cart => {
      const index = cart.findIndex(item => item?.product?.id === productId);

      if (index != -1) {
        const updated = [...cart];

        updated[index] = {
          product: updated[index].product,
          quantity
        }

        return updated;
      }

      return cart;
    })
  }

}
