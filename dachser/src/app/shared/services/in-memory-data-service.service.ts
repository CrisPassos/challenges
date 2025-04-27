import { Injectable } from '@angular/core';
import { InMemoryWebApiModule, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Shipment } from '../models/shipment.model';
import { Observable } from 'rxjs';

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

  post(reqInfo: RequestInfo): Observable<any> {
    if (reqInfo.collectionName === 'shipments') {
      const data = reqInfo.utils.getJsonBody(reqInfo.req);
      const collection = reqInfo.collection as any[];

      const exists = collection.some(item => item.id === data.id);
      if (exists) {
        const options: ResponseOptions = {
          body: { error: `Shipment with ID ${data.id} already exists.` },
          status: STATUS.BAD_REQUEST
        };
        return reqInfo.utils.createResponse$(() => options);
      }
    }

    return undefined!;
  }
}
