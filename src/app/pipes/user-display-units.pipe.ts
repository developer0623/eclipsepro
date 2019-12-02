import { Pipe, PipeTransform } from '@angular/core';
import { UnitsService } from 'app/services/units.service';

@Pipe({
  name: 'userDisplayUnits'
})
export class UserDisplayUnitsPipe implements PipeTransform {
  constructor(private unitsService: UnitsService) {}

  transform(type: any): any {
    return this.unitsService.getUserDisplayUnits(type);
  }

}
