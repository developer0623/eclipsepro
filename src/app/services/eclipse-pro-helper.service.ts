import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EclipseProHelperService {

  constructor() { }
  buildRepeatText (downtimeData) {
    let repeatText = '';
    if (downtimeData.occurs === 'Daily') {
      repeatText = 'Daily : Every ' + (downtimeData.everyCount > 1 ? (downtimeData.everyCount + ' Days') : 'Day');
    }

    if (downtimeData.occurs === 'Weekly') {
      repeatText = 'Weekly : Every ' + (downtimeData.everyCount > 1 ? downtimeData.everyCount : '')
        + (downtimeData.everyCount > 1 ? ' weeks on ' : 'week on ') + downtimeData.daysOfWeek.join(', ').replace(/,(?!.*,)/gmi, ' and');
    }

    if (downtimeData.occurs === 'Monthly') {
      const datesWithSuffix = [];
      if (downtimeData.monthValue === 'Each') {
          downtimeData.selectedDate = downtimeData.selectedDate.sort((a, b) => a - b);
          downtimeData.selectedDate.forEach((selectedDate) => {
            const j = selectedDate % 10;
            const  k = selectedDate % 100;
            if (j === 1 && k !== 11) {
              datesWithSuffix.push(selectedDate + 'st');
            } else if (j === 2 && k !== 12) {
              datesWithSuffix.push(selectedDate + 'nd');
            } else if (j === 3 && k !== 13) {
              datesWithSuffix.push(selectedDate + 'rd');
            } else {
              datesWithSuffix.push(selectedDate + 'th');
            }
          });
      }

      if (downtimeData.weekDayOfMonth === 'WeekendDay') {
          downtimeData.weekDayOfMonth = 'Weekend Day';
      } else if (downtimeData.weekDayOfMonth === 'WeekDay') {
          downtimeData.weekDayOfMonth = 'Week Day';
      }
      repeatText = 'Monthly : Every ' + (downtimeData.everyCount > 1 ? downtimeData.everyCount : '') +
        (downtimeData.everyCount > 1 ? ' Months on ' : 'Month on the ') +
        (downtimeData.monthValue === 'Each' ? datesWithSuffix.join(', ').replace(/,(?!.*,)/gmi, ' and') :
        downtimeData.dayOfMonth + ' ' + downtimeData.weekDayOfMonth);
    }

    if (downtimeData.occurs === 'OneTime') {
      repeatText = 'One Time';
    }
    return repeatText;
  }

  buildDuration(duration) {
    const formattedDuration: any = {};
    duration = duration.split(':');
    formattedDuration.hours = duration[0] === '00' ? 0 : Number(duration[0]);
    formattedDuration.mins = duration[1] === '00' ? 0 : Number(duration[1]);
    return formattedDuration;
  }

  buildStartTime(startTime) {
    const formattedTime: any = {};
    startTime = startTime.split(':');
    formattedTime.hours = startTime[0] > 12 ? Number(startTime[0]) - 12 : Number(startTime[0]) === 0 ? '12' : Number(startTime[0]);
    formattedTime.hours = formattedTime.hours < 10 ? '0' + formattedTime.hours : formattedTime.hours;
    formattedTime.mins = startTime[1];
    formattedTime.meridian =  startTime[0] >= 12 ? 'PM' : 'AM';
    return formattedTime;
  }
}
