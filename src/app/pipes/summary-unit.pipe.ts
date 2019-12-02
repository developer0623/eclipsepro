import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summaryUnit'
})
export class SummaryUnitPipe implements PipeTransform {
  transform(value: number, unitVal: string = ''): any {
    const unit = unitVal.toLowerCase();
    if (unit === 'ft') {
      if (value > 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      } else if (value > 1000) {
        return (value / 1000).toFixed(1) + 'K';
      } else {
        return value.toFixed(1);
      }
    }

    if (unit === 'min') {
      return value.toFixed(1);
    }
    return (value * 100).toFixed(1);
  }

}
