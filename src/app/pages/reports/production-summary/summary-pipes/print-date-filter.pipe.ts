import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printDateFilter'
})
export class PrintDateFilterPipe implements PipeTransform {

  transform(startMoment: any, endMoment: any, state: string): string {
    const startDay = startMoment.format('DD');
    const startMonth = startMoment.format('MMM');
    const startYear = startMoment.format('YYYY');
    const endDay = endMoment.format('DD');
    const endMonth = endMoment.format('MMM');
    const endYear = endMoment.format('YYYY');

    let newText = '';
    if (state === 'Day') {
      newText = `${endMonth} ${endDay}<span>${endYear}</span>`;
    } else if (state === 'Month'){
      newText = `${endMonth}<span>${endYear}</span>`;
    } else {
      if (startYear === endYear) {
        newText = `${startMonth} ${startDay} - ${endMonth} ${endDay} <span>${endYear}</span>`;
      } else {
        newText = `${startMonth} ${startDay} <span>${startYear}</span> - ${endMonth} ${endDay} <span>${endYear}</span>`;
      }
    }
    return newText;
  }

}
