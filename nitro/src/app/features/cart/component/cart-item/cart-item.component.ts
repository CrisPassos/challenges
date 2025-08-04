import { Component, inject, Input } from '@angular/core';
import { CartItem } from '../../../../shared/models/cart.model';
import { CartService } from '../../../../shared/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;

  private cartService = inject(CartService);

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

}
