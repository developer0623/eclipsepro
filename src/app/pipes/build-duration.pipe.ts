import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buildDuration'
})
export class BuildDurationPipe implements PipeTransform {

  transform(input: any, isDuration: boolean): any {
    if (typeof input === 'undefined') {
      return {};
    }
    if (isDuration) {
        let formattedDuration: any = {};
        input = input.split(':');
        formattedDuration.hours = input[0] === '00' ? 0 : Number(input[0]);
        formattedDuration.mins = input[1] === '00' ? 0 : Number(input[1]);
        formattedDuration = (formattedDuration.hours > 0 ? Number(formattedDuration.hours) + ' Hours ' : '') +
          (formattedDuration.mins > 0 ? Number(formattedDuration.mins) + ' Mins' : '');
        return formattedDuration;
    } else {
        let formattedTime: any = {};
        input = input.split(':');
        formattedTime.hours = Number(input[0]) > 12 ? Number(input[0]) - 12 : Number(input[0]) === 0 ? '12' : Number(input[0]);
        formattedTime.hours = formattedTime.hours < 10 ? '0' + formattedTime.hours : formattedTime.hours;
        formattedTime.mins = input[1];
        formattedTime.meridian =  input[0] >= 12 ? 'PM' : 'AM';
        formattedTime = Number(formattedTime.hours) + ':' + formattedTime.mins + ' ' + formattedTime.meridian;
        return formattedTime;
    }
  }

}
