import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateProfitComponent } from './calculate-profit.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('CalculateProfitComponent', () => {
  let component: CalculateProfitComponent;
  let fixture: ComponentFixture<CalculateProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculateProfitComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculateProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Calculate Profit or Loss', () => {
    it('should be profit without additional costs', () => {
      expect(component.calculateProfit("0", "0", "1000"))
        .toEqual({ totalCosts: 0, profit: 1000 })
    });

    it('should be loss without additional costs', () => {
      expect(component.calculateProfit("1500", "0", "1000"))
        .toEqual({ totalCosts: 1500, profit: -500 })
    });

    it('should be profit without total costs', () => {
      expect(component.calculateProfit("50", "50", "1000"))
        .toEqual({ totalCosts: 100, profit: 900 })
    });

    it('should be loss without total costs', () => {
      expect(component.calculateProfit("500", "600", "1000"))
        .toEqual({ totalCosts: 1100, profit: -100 })
    });
  })


});
