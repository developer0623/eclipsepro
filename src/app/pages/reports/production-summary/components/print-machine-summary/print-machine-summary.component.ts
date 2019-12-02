import { Component, OnInit, Input } from '@angular/core';
import { IProductionSummaryReportRecord  } from 'app/models/dto';

@Component({
  selector: 'app-print-machine-summary',
  templateUrl: './print-machine-summary.component.html',
  styleUrls: ['./print-machine-summary.component.scss']
})
export class PrintMachineSummaryComponent implements OnInit {
  @Input() machine = '';
  @Input() data: IProductionSummaryReportRecord;

  constructor() { }

  ngOnInit() {
  }

}
