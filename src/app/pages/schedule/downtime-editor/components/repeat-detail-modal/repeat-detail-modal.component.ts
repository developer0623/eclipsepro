import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-repeat-detail-modal',
  templateUrl: './repeat-detail-modal.component.html',
  styleUrls: ['./repeat-detail-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RepeatDetailModalComponent implements OnInit {
  repeatData = [
    {
      'label': 'One Time',
      'value': 'OneTime'
    }, {
      'label': 'Daily',
      'value': 'Daily'
    }, {
      'label': 'Weekly',
      'value': 'Weekly'
    }, {
      'label': 'Monthly',
      'value': 'Monthly'
    }
  ];
  weekData = [
    {
      'id': 'S',
      'day': 'Sunday'
    }, {
      'id': 'M',
      'day': 'Monday'
    }, {
      'id': 'T',
      'day': 'Tuesday'
    }, {
      'id': 'W',
      'day': 'Wednesday'
    }, {
      'id': 'T',
      'day': 'Thursday'
    }, {
      'id': 'F',
      'day': 'Friday'
    }, {
      'id': 'S',
      'day': 'Saturday'
    }
  ];
  weekDayOfMonth = ['Week Day', 'Weekend Day', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayOfMonth = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Last'];
  everyCount = [1, 2, 3, 4, 5];
  monthDays = [];
  dates = [];
  todayDate = new Date().getDate();

  downtimeData = {
    everyCount: this.everyCount[0],
    monthValue: 'Each',
    dayOfMonth: this.dayOfMonth[0],
    weekDayOfMonth: this.weekDayOfMonth[0],
    selectedDate: [],
    daysOfWeek: [],
    occurs: ''
  };

  constructor(public dialogRef: MatDialogRef<RepeatDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    for (let i = 1; i <= 31; i++) {
      this.monthDays.push(i);
    }
    for (let i = 0; i < this.monthDays.length; i++ ) {
      if (i % 7 === 0) {
        this.dates.push([]);
      }
      this.dates[this.dates.length - 1].push(this.monthDays[i]);
    }
  }

  ngOnInit() {
    const { downtimeData } = this.data;
    const occurs = downtimeData.occurs.split(' :');
    this.downtimeData = {
      ...this.downtimeData,
      ...downtimeData,
      occurs: occurs[0]
    };

    if (this.downtimeData.weekDayOfMonth === 'WeekendDay') {
      this.downtimeData.weekDayOfMonth = 'Weekend Day';
    } else if (this.downtimeData.weekDayOfMonth === 'WeekDay') {
      this.downtimeData.weekDayOfMonth = 'Week Day';
    }
  }

  onSelectedWeekDay(weekDay) {
    if (this.downtimeData.daysOfWeek.length) {
      if (this.downtimeData.daysOfWeek.indexOf(weekDay) > -1) {
        const index = this.downtimeData.daysOfWeek.indexOf(weekDay);
        this.downtimeData.daysOfWeek.splice(index, 1);
      } else {
        this.downtimeData.daysOfWeek.push(weekDay);
      }
    } else {
      this.downtimeData.daysOfWeek.push(weekDay);
    }
  }

  onSelectedDay(day) {
    if (this.downtimeData.selectedDate.length) {
      if (this.downtimeData.selectedDate.indexOf(day) > -1) {
        const index = this.downtimeData.selectedDate.indexOf(day);
        this.downtimeData.selectedDate.splice(index, 1);
      } else {
        this.downtimeData.selectedDate.push(day);
      }
    } else {
      this.downtimeData.selectedDate.push(day);
    }

  }

  saveRepeatDetails() {
    if (this.downtimeData.occurs !== 'Weekly') {
      this.downtimeData.daysOfWeek = [];
    }
    if (this.downtimeData.occurs !== 'Monthly') {
      this.downtimeData.monthValue = 'Each';
      this.downtimeData.selectedDate = [];
      this.downtimeData.dayOfMonth = this.dayOfMonth[0];
      this.downtimeData.weekDayOfMonth = this.weekDayOfMonth[0];
    }
    if (this.downtimeData.monthValue === 'OnThe') {
      this.downtimeData.selectedDate = [];
    } else if (this.downtimeData.monthValue === 'Each') {
      this.downtimeData.dayOfMonth = this.dayOfMonth[0];
      this.downtimeData.weekDayOfMonth = this.weekDayOfMonth[0];
    }

    this.dialogRef.close({data: this.downtimeData});
  }

}
