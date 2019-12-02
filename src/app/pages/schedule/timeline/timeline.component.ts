import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { MachineService } from 'app/services/machine.service';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  machines$: Observable<{}[]>;
  machineArray: any[] = [];
  focusExtent = [moment().subtract(10, 'minutes').toDate(), moment().add(8, 'hours').toDate()];
  cursor = Date.now();

  constructor(private machineService: MachineService) {
    this.machines$ = this.machineService.getMchinesForTimeLine()
      .pipe(
        filter(x => x !== null)
        , map(x => x.filter((y: any) => y.machine !== null && y.schedule != null && y.state != null
          && y.statistics != null))
        , filter(x => x.length > 0)
        , tap((x => {
          if (!this.machineArray.length) {
            this.machineArray = x;
          }
          // this.machineArray = x;
          console.log('xxxxxxx', x);
          }))
        );
    this.machines$.subscribe();
  }

  ngOnInit() {
  }

  onChangeDomain(domain) {
    this.focusExtent = domain;
  }

}
