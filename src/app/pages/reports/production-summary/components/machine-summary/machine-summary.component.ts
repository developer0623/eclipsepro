import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material';
import { IProductionSummaryReportRecord  } from 'app/models/dto';
import { ReportGraphDialogComponent } from '../report-graph-dialog/report-graph-dialog.component';

@Component({
  selector: 'app-machine-summary',
  templateUrl: './machine-summary.component.html',
  styleUrls: ['./machine-summary.component.scss']
})
export class MachineSummaryComponent implements OnInit {
  @Input() machine = '';
  @Input() data: IProductionSummaryReportRecord;
  constructor(private dialog: MatDialog) { }

  ngOnInit() { }

  showPopover(data, index) {
    this.dialog.open(ReportGraphDialogComponent, {
      panelClass: ['report-graph-dialog', 'custom-dialog'],
      height: '320px',
      width: '500px',
      data: {
        content: data,
        state: index,
        machine: this.machine
      }
    });

  }

}
