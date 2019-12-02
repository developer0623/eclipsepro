import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeSpan'
})
export class TimeSpanPipe implements PipeTransform {

  transform(value: any): any {
    const timeSpanIn = moment.duration(value);
    // todo:add other formats (x H x M x S)
    return timeSpanIn.humanize();
  }

}
