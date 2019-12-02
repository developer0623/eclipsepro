import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { IMachine } from 'app/models/dto';
import { EclipseProHelperService } from 'app/services/eclipse-pro-helper.service';
import { RepeatDetailModalComponent } from '../repeat-detail-modal/repeat-detail-modal.component';

export interface DialogData {
  singleDowntimeData: any;
  showDelete: boolean;
  machines: IMachine[];
}

@Component({
  selector: 'app-downtime-detail-modal',
  templateUrl: './downtime-detail-modal.component.html',
  styleUrls: ['./downtime-detail-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DowntimeDetailModalComponent implements OnInit {
  types = [
    'Break',
    'Breakdown',
    'Maintenance',
    'Meeting',
    'Unscheduled'
  ];

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

  endRepeatData = [
    {
      'label': 'Never',
      'value': 'Never'
    }, {
      'label': 'After',
      'value': 'After'
    }, {
      'label': 'On Date',
      'value': 'OnDate'
    }
  ];

  meridianData = [
    'AM',
    'PM'
  ];
  repeatCount = [1, 2, 3, 4, 5];
  downtime: any = {
    activityType: '',
    title: '',
    startDate: null,
    endDate: null,
    occursText: '',
    occurs: '',
    endRepeat: '',
    occurenceCount: 1,
    duration: null,
    timeOfDay: null,
    machines: [],
    weekDayOfMonth: ''
  };

  startTime = {
    hours: 0,
    mins: 0,
    meridian: ''
  };

  duration = {
    hours: 0,
    mins: 0
  };

  durationHours = [];
  durationMins = [];
  hours = [];
  mins = [];
  selectedMachines = [];
  machinesData = [];
  showDelete = false;

  constructor(public dialogRef: MatDialogRef<DowntimeDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private eclipseProHelper: EclipseProHelperService,
    private dialog: MatDialog) {
    for (let i = 0; i <= 12; i++) {
      if (i < 10) {
        this.hours.push(`0${i}`);
      } else {
        this.hours.push(i);
      }
    }

    for (let i = 0; i <= 59; i++) {
      if (i < 10) {
        this.mins.push(`0${i}`);
      } else {
        this.mins.push(i);
      }
    }

    for (let i = 0; i <= 23; i++) {
      this.durationHours.push(i);
    }

    for (let i = 0; i <= 59; i++) {
      this.durationMins.push(i);
    }
  }

  ngOnInit() {
    const { singleDowntimeData, showDelete, machines } = this.data;
    this.machinesData = machines;
    this.showDelete = showDelete;
    if (singleDowntimeData && showDelete) {
      this.downtime = {...singleDowntimeData};
      if (this.downtime.duration) {
          this.duration = this.eclipseProHelper.buildDuration(this.downtime.duration);
      }
      if (this.downtime.timeOfDay) {
          this.startTime = this.eclipseProHelper.buildStartTime(this.downtime.timeOfDay);
      }
      this.downtime.startDate = new Date(this.downtime.startDate);
      this.selectedMachines = [];
      this.downtime.machines.forEach((m) => {
        this.selectedMachines.push(machines[m]);
      });
      this.downtime.endDate = new Date(this.downtime.endDate);
      if (this.eclipseProHelper.buildRepeatText(this.downtime)) {
        this.downtime.occursText = this.eclipseProHelper.buildRepeatText(this.downtime);
        this.downtime.occurs = this.downtime.occursText;
      }
      if (this.downtime.occursText === 'One Time') {
        this.downtime.occurs = 'OneTime';
        this.downtime.occursText = '';
      }
    } else {
      this.duration = {
        hours: this.durationHours[0],
        mins: this.durationMins[30]
      };
      this.startTime = {
        hours: this.hours[12],
        mins: this.mins[0],
        meridian: this.meridianData[1]
      };
      this.downtime = {
        ...this.downtime,
        occurs: 'OneTime',
        endRepeat: 'Never',
        occurenceCount: this.repeatCount[0],
        startDate: new Date(),
        endDate: new Date(),
        occursText: ''
      };
    }
  }

  openRepeatPopup() {
    if (this.downtime.occurs !== 'OneTime') {
      const singleDowntimeData = {...this.downtime};
      const dialogRef = this.dialog.open(RepeatDetailModalComponent, {
        panelClass: 'repeat-dialog',
        data: {
          downtimeData: singleDowntimeData
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.data) {
          this.downtime = {...result.data};
          if (this.downtime.occurs === 'OneTime') {
            this.downtime.occursText = '';
          } else {
            this.downtime.occursText = this.eclipseProHelper.buildRepeatText(this.downtime);
            this.downtime.occurs = this.downtime.occursText;
          }
        }
      });

    } else {
      this.downtime.endRepeat = 'Never';
      this.downtime.occurs = 'OneTime';

    }
  }

  deleteDowntime(isDelete) {
    this.dialogRef.close({id: this.downtime.id, isDelete});
  }

  saveDowntimeDetails() {
    if (this.duration) {
      this.downtime.duration = (this.duration.hours < 10 ? '0' + this.duration.hours : this.duration.hours) + ':'
        + (this.duration.mins < 10 ? '0' + this.duration.mins : this.duration.mins);
    }
    if (this.startTime && this.startTime.hours && this.startTime.mins) {
      const formatTime = {hours: 0};
      formatTime.hours = this.startTime.meridian === 'PM' ? (Number(this.startTime.hours) === 12 ? Number(this.startTime.hours) :
        Number(this.startTime.hours) + 12) : this.startTime.hours === 12 ? this.startTime.hours - 12 : this.startTime.hours;
      this.downtime.timeOfDay = (formatTime.hours === 0 ? '00' : formatTime.hours) + ':' + this.startTime.mins + ':00';
    }
    if (this.downtime.occurs !== 'OneTime') {
      const occurs = this.downtime.occurs.split(' :');
      this.downtime.occurs = occurs[0];
    }

    if (this.downtime.weekDayOfMonth === 'Weekend Day') {
      this.downtime.weekDayOfMonth = 'WeekendDay';
    } else if (this.downtime.weekDayOfMonth === 'Week Day') {
      this.downtime.weekDayOfMonth = 'WeekDay';
    }

    const machines = [];
    this.selectedMachines.forEach((downtimeMachine) => machines.push(downtimeMachine.machineNumber));
    this.downtime.machines = machines.sort();

    const startDate = this.downtime.startDate.toISOString();
    const endDate = this.downtime.endDate.toISOString();
    this.downtime = {
      ...this.downtime,
      startDate,
      endDate
    };

    this.dialogRef.close({data: this.downtime});
  }

}
