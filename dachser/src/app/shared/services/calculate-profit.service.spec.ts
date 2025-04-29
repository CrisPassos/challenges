import { TestBed } from '@angular/core/testing';

import { CalculateProfitService } from './calculate-profit.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CalculateProfitService', () => {
  let service: CalculateProfitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CalculateProfitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
