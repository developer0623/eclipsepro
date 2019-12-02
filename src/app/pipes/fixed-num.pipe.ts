import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixedNum'
})
export class FixedNumPipe implements PipeTransform {

  transform(value: number | string, pos: number): any {
    return Number(value).toFixed(pos);
  }

}
