import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateProfitComponent } from './calculate-profit.component';

describe('CalculateProfitComponent', () => {
  let component: CalculateProfitComponent;
  let fixture: ComponentFixture<CalculateProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculateProfitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
