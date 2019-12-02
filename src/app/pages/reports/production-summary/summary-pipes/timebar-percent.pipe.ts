import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timebarPercent'
})
export class TimebarPercentPipe implements PipeTransform {
  transform(value: any): any {
    return (Number(value) * 100).toFixed(2);
  }
}
