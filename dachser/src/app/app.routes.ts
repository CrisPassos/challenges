import { Routes } from '@angular/router';
import { CalculateProfitComponent } from './features/calculate-profit/calculate-profit.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'calculate-profit', loadComponent: () => import('./features/calculate-profit/calculate-profit.component').then(m => m.CalculateProfitComponent)
  },
];
