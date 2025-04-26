import { TestBed } from '@angular/core/testing';

import { CalculateProfitService } from './calculate-profit.service';

describe('CalculateProfitService', () => {
  let service: CalculateProfitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateProfitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
