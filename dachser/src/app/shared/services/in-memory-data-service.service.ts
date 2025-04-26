import { Injectable } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Shipment } from '../models/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryWebApiModule {
  createDb() {
    const shipments: Shipment[] = [
      { id: 1, income: 1000.0, totalCosts: 500.0, profit: 500.0 },
      { id: 2, income: 2000.0, totalCosts: 1500.0, profit: 500.0 },

    ]
    return { shipments };
  }
}
