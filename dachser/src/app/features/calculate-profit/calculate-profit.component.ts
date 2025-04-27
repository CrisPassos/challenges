import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CalculateProfitService } from '../../shared/services/calculate-profit.service';
import { Subject, takeUntil } from 'rxjs';
import { Shipment } from '../../shared/models/shipment.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calculate-profit',
  imports: [DataTableComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './calculate-profit.component.html',
  styleUrl: './calculate-profit.component.scss'
})
export class CalculateProfitComponent implements OnInit, OnDestroy {
  shipmentForm: FormGroup;
  services = inject(CalculateProfitService);
  fb = inject(FormBuilder);
  alert = inject(MatSnackBar);

  rows = signal<Shipment[]>([]);
  columns = [
    { key: 'id', label: 'Shipment ID' },
    { key: 'income', label: 'Income' },
    { key: 'totalCosts', label: 'Total Costs' },
    { key: 'profit', label: 'Profit or Loss' },
  ];

  private destroy$ = new Subject<void>();

  constructor() {
    const numberPattern = '^[0-9]*$';
    const decimalPattern = '^[0-9]+([.,][0-9]{1,2})?$';

    this.shipmentForm = this.fb.group({
      shipmentId: [null, [Validators.required, Validators.pattern(numberPattern)]],
      income: [null, [Validators.required, Validators.pattern(decimalPattern)]],
      cost: [null, [Validators.required, Validators.pattern(decimalPattern)]],
      additionalCost: [null, [Validators.pattern(decimalPattern)]],
    });
  }

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments() {
    this.services.loadProfitsOrLosses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.rows.set(data.map((shipment) => ({
          id: shipment.id,
          income: shipment.income,
          totalCosts: shipment.totalCosts,
          profit: shipment.profit,
        }))),
        error: (err) => this.alert.open(`Error: ${err?.body?.error}`, 'Close', {
          verticalPosition: 'top', duration: 8000
        })
      });
  }

  onSubmit() {
    if (this.shipmentForm.valid) {
      const { shipmentId, income, cost, additionalCost } = this.shipmentForm.value;
      const totalCosts = parseFloat(cost) + (additionalCost ? parseFloat(additionalCost) : 0);
      const profit = parseFloat(income) - totalCosts;

      const shipment = {
        id: parseInt(shipmentId),
        income: parseFloat(income),
        totalCosts,
        profit,
      };


      this.services.calculateProfit(shipment).subscribe({
        next: () => this.loadShipments(),
        error: (err) =>
          this.alert.open(`Error: ${err?.body?.error}`, 'Close', { verticalPosition: 'top', duration: 8000 }),
        complete: () => {
          this.alert.open('Profit calculated successfully', 'Close', { verticalPosition: 'top', duration: 8000 });
          this.shipmentForm.reset({ emitEvent: false });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
