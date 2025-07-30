import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products', loadComponent: () => import('./features/product/pages/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'cart', loadComponent: () => import('./features/cart/pages/cart/cart.component').then(m => m.CartComponent)
  }
];
