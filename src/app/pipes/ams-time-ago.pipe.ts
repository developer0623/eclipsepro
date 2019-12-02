import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'amsTimeAgo'
})
export class AmsTimeAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const dateIn = moment(value);
    if (dateIn.isBefore('1980-01-02')) {
          return '';
    }
    return dateIn.fromNow(true);
  }

}
