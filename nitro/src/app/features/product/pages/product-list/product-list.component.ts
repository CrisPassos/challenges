import { Component, computed, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../shared/services/product.service';
import { CartService } from '../../../../shared/services/cart.service';
import { Product } from '../../../../shared/models/product.model';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { CartItem } from '../../../../shared/models/cart.model';

// I work with features, because I can have ProductsList, ProductDetail, ProductEdit, etc.
@Component({
  selector: 'app-product-list',
  imports: [ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService)
  cartService = inject(CartService)

  products = computed(() => this.productService.productsSignal());

  ngOnInit(): void {
    this.productService.loadProducts();
  }

  addToCart(event: { cart: CartItem }) {
    const { product, quantity } = event.cart;
    this.cartService.addToCart(product, quantity);
    alert(`Added ${quantity} ${product.title} to cart!`);
  }

}
