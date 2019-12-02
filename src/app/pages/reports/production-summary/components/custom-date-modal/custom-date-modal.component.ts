import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';

export interface DialogData {
  startDate: any;
  endDate: any;
  durationLength: number;
  selectedDuration: string;
}

@Component({
  selector: 'app-custom-date-modal',
  templateUrl: './custom-date-modal.component.html',
  styleUrls: ['./custom-date-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomDateModalComponent implements OnInit {
  durations = ['Days', 'Weeks', 'Months'];
  startDate = moment();
  endDate = moment();
  selectedDuration = this.durations[0];
  durationLength = 1;
  formStartDate = new FormControl(new Date());
  formEndDate = new FormControl(new Date());

  constructor(public dialogRef: MatDialogRef<CustomDateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    const { startDate, endDate, durationLength, selectedDuration } = this.data;
    this.startDate = startDate;
    this.endDate = endDate;
    this.selectedDuration = selectedDuration;
    this.durationLength = durationLength;
    this.formStartDate = new FormControl(this.startDate.format());
    this.formEndDate = new FormControl(this.endDate.format());
  }

  onlyAllowDate = (date: Date) => {
    const day = date.getTime();
    const start = this.startDate.valueOf();
    return day > start;
  }

  onChangeDuration() {
    this.calculateEndDate();
  }

  calculateEndDate() {
    switch (this.selectedDuration) {
      case 'Weeks': {
        this.endDate = this.startDate.clone().add(this.durationLength, 'w');
        break;
      }
      case 'Months': {
        this.endDate = this.startDate.clone().add(this.durationLength, 'm');
        break;
      }
      default: {
        this.endDate = this.startDate.clone().add(this.durationLength, 'd');
        break;
      }
    }
    this.formEndDate = new FormControl(this.endDate.format());
  }

  onChangeStartDate() {
    this.startDate = moment(this.formStartDate.value);
    this.calculateEndDate();
  }

  onChangeEndDate() {
    this.endDate = moment(this.formEndDate.value);
    this.selectedDuration = this.durations[0];
    this.durationLength = this.endDate.diff(this.startDate, 'days') + 1;
  }

  saveCustomDate() {
    const data = {
      startDate: this.startDate,
      endDate: this.endDate,
      durationLength: this.durationLength,
      selectedDuration: this.selectedDuration
    };
    this.dialogRef.close({data});
  }

}
