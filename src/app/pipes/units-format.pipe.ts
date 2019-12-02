import { Pipe, PipeTransform } from '@angular/core';
import { UnitsService } from 'app/services/units.service';

@Pipe({
  name: 'unitsFormat'
})
export class UnitsFormatPipe implements PipeTransform {
  constructor(private unitsService: UnitsService) {}

  transform(input, inType, decimals, hideUnit, shortenTo, outType): any {
    if (!shortenTo) {
      return this.unitsService.formatUserUnits(input, inType, decimals, hideUnit, outType);
    } else {
      return this.unitsService.shortenBigNumber(input, inType, shortenTo);
    }
  }

}
