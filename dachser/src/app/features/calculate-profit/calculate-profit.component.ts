import { Component } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';

@Component({
  selector: 'app-calculate-profit',
  imports: [DataTableComponent],
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

}
