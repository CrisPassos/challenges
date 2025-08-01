import { Component, computed, inject } from '@angular/core';
import { CartItem } from '../../../../shared/models/cart.model';
import { CartService } from '../../../../shared/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.cartSignal;

  total = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  increaseQuantity(item: CartItem) {
    this.cartService.updatedQuantity(item.product.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    const newQty = item.quantity - 1;
    if (newQty > 0) {
      this.cartService.updatedQuantity(item.product.id, newQty);
    } else {
      this.cartService.removeFromCart(item.product.id);
    }
  }

  getTotal(): number {
    return this.total();
  }
}
