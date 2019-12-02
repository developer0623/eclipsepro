import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskLenghFilter'
})
export class TaskLenghFilterPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return 0;
    }
    return Math.round(value);
  }

}
