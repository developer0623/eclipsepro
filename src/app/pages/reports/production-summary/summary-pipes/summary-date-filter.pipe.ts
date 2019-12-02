import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summaryDateFilter'
})
export class SummaryDateFilterPipe implements PipeTransform {

  transform(startMoment: any, endMoment: any, state: string): string {
    const startDay = startMoment.format('DD');
    const startMonth = startMoment.format('MMM');
    const startYear = startMoment.format('YYYY');
    const endDay = endMoment.format('DD');
    const endMonth = endMoment.format('MMM');
    const endYear = endMoment.format('YYYY');
    let newText = '';
    switch (state) {
      case 'Week': {
        const weekOfEndDate = endMoment.format('w');
        if (startMonth === endMonth) {
          newText = `${startMonth} ${startDay} - ${endDay}`;
        } else {
          newText = `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
        }
        newText += ` <span class="center-child">week:</span> ${weekOfEndDate} <span class="last-child">OF ${endYear}</span>`;
        break;
      }
      case 'Month': {
        newText = `${startMonth} ${startYear}`;
        break;
      }
      case 'Custom': {
        const endDayOfWeek = endMoment.format('dd');
        const startDayOfWeek = startMoment.format('dd');
        newText = `<span class='first-child'>${startDayOfWeek}:</span>
          ${startMonth} ${startDay}  -  <span class='first-child'>${endDayOfWeek}:</span>${endMonth} ${endDay}
          <span class='last-child'>${endYear}</span>`;
        break;
      }
      default: {
        const startDayOfWeek = startMoment.format('dddd');
        newText = `<span class='first-child'>${startDayOfWeek},</span>${startMonth} ${startDay}<span class='last-child'>${endYear}</span>`;
        break;
      }
    }
    return newText;
  }

}
