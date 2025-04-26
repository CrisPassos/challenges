import { inject, Injectable } from '@angular/core';
import { Shipment } from '../models/shipment.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculateProfitService {
  private apiUrl = "api/shipments";
  http = inject(HttpClient);

  calculateProfit(shipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(this.apiUrl, shipment);
  }

  loadProfitsOrLosses(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.apiUrl);
  }
}
