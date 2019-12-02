import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MachineService } from 'app/services/machine.service';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.scss']
})
export class MachineDetailComponent implements OnInit {
  machineId = 0;
  singleData: any;
  metricList = ['oEE', 'scrapPct', 'runTimePct', 'good', 'target'];
  realMetricList = [];
  focusExtent = [moment().subtract(10, 'minutes').toDate(), moment().add(8, 'hours').toDate()];
  cursor = Date.now();

  constructor(private route: ActivatedRoute, private machineService: MachineService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.machineId = parseInt(paramMap.get('id'), 10);
      this.machineService.getMachineItem(this.machineId)
      .pipe(
        filter((y: any) => y.machine !== null && y.metricDefinitions != null && y.state != null
          && y.statistics != null && y.metricSettings != null && y.statisticsHistory != null
          && y.scheduleSummary != null && y.schedule != null),
        tap(x => {
          this.singleData = x;
          this.getMetrics(x.metricDefinitions);
        }),
        // This line is key. This terminates the subscription with the server, else the server would
        // never stop sending updates. Putting the dispatch in a finalize means it occurs when
        // the rx subscription is torn down. (which is handled by the `async` pipe, if we use them).
        // finalize(() => store.dispatch(new DelSubscription(serverSub)))
      )
      .subscribe();
    });
  }

  getMetrics(defs) {
    this.realMetricList = [];
    defs.forEach((def) => {
      const index = this.metricList.indexOf(def.metricId);
      if (index > -1) {
        this.realMetricList.push(def);
      }
    });

  }
}
