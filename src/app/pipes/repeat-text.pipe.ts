import { Pipe, PipeTransform } from '@angular/core';
import { EclipseProHelperService } from 'app/services/eclipse-pro-helper.service';

@Pipe({
  name: 'repeatText'
})
export class RepeatTextPipe implements PipeTransform {
  constructor(private eclipseProHelper: EclipseProHelperService) {}

  transform(value: any, args?: any): any {
    return this.eclipseProHelper.buildRepeatText(value);
  }

}
