import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';

export interface DialogData {
  summaryList: any;
  duration: string;
  startDate: any;
  endDate: any;
  shift: string;
  factoryName: string;
  machines: any[];
}

@Component({
  selector: 'app-print-preview-dialog',
  templateUrl: './print-preview-dialog.component.html',
  styleUrls: ['./print-preview-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PrintPreviewDialogComponent implements OnInit {
  sizes = [{id: 0, size: '8.5 x 11'}, {id: 1, size: '11 x 17'}];
  selectedSize = 0;
  printStyles = [{id: 0, value: "Don't Include"}, {id: 1, value: 'Side, On Next Page'}, {id: 2, value: 'Stacked'}];
  selectedStyle = 0;
  nextPage = 0;
  factoryName = '';
  startDate = moment();
  endDate = moment();
  duration = '';
  shift = '';
  summaryList$;
  machines = [];

  constructor(public dialogRef: MatDialogRef<PrintPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    const { startDate, endDate, duration, shift, summaryList, factoryName, machines } = this.data;
    this.summaryList$ = summaryList;
    this.duration = duration;
    this.startDate = startDate;
    this.endDate = endDate;
    this.factoryName = factoryName;
    this.shift = shift;
    this.machines = machines;
  }

  change() {
    this.nextPage = 0;
  }

  setPageSize() {
    const style = document.createElement('style');
    if (!this.selectedSize) {
      style.innerHTML = '@page {size: 8.5in 11in}';
    } else {
      style.innerHTML = '@page {size: 11in 17in}';
    }
    document.head.appendChild(style);
  }

  print() {
    if (this.selectedStyle === 0 && !this.nextPage) {
      this.nextPage = 1;
    } else {
      this.setPageSize();
      const printContents = document.getElementById('main-print-body').innerHTML;
      const mainComp = document.getElementById('print-body');
      mainComp.innerHTML = printContents;
      window.print();
      mainComp.innerHTML = '';
    }
  }

}
