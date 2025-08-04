import { Component, computed, inject } from '@angular/core';
import { CartItem } from '../../../../shared/models/cart.model';
import { CartService } from '../../../../shared/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { CartItemComponent } from "../../component/cart-item/cart-item.component";

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.cartSignal;

  total = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  getTotal(): number {
    return this.total();
  }
}
