import { Component } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-calculate-profit',
  imports: [DataTableComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './calculate-profit.component.html',
  styleUrl: './calculate-profit.component.scss'
})
export class CalculateProfitComponent {

  columns = [
    { key: 'id', label: 'Shipment ID' },
    { key: 'income', label: 'Income' },
    { key: 'costs', label: 'Total Costs' },
    { key: 'profit', label: 'Profit or Loss' },
  ];

  rows = [
    { id: "0001", income: "1000", costs: "200", profit: "800" },
    { id: "0002", income: "500", costs: "900", profit: "-400" },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      shipmentId: ['', Validators.required],
      income: ['', Validators.required],
      cost: ['', Validators.required],
      additionalCost: [''],
    });
  }

  submit() {
    if (this.form.valid) {
      console.log('Formulário enviado:', this.form.value);
    } else {
      console.log('Formulário inválido');
    }
  }

}
