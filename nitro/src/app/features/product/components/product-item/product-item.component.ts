import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<{ cart: { product: Product; quantity: number } }>();

  quantities: { [productId: number]: number } = {};

  increaseQuantity(product: Product) {
    const current = this.quantities[product.id] || 1;
    this.quantities[product.id] = current + 1;
  }

  decreaseQuantity(product: Product) {
    const current = this.quantities[product.id] || 1;
    if (current > 1) {
      this.quantities[product.id] = current - 1;
    }
  }
}
