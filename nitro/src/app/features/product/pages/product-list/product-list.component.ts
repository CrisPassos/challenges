import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
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
export class ProductListComponent implements OnInit, OnDestroy {

  productService = inject(ProductService)
  cartService = inject(CartService)

  products = computed(() => this.productService.productsSignal());
  categories = computed(() => this.productService.categorySignal());

  ngOnInit(): void {
    this.productService.getProducts();
    this.productService.getCategory();
  }

  addToCart(event: { cart: CartItem }) {
    const { product, quantity } = event.cart;
    this.cartService.addToCart(product, quantity);
    alert(`Added ${quantity} ${product.title} to cart!`);
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;
    this.productService.getProductsByCategory(selectedCategory);
  }

  ngOnDestroy(): void {
    this.productService.closeConnection();
  }

}
