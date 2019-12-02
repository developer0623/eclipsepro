import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-machine-dashboard-mini',
  templateUrl: './machine-dashboard-mini.component.html',
  styleUrls: ['./machine-dashboard-mini.component.scss']
})
export class MachineDashboardMiniComponent implements OnInit {
  @Input('machine') machine: any;
  @Input('machineState') machineState: any;
  @Input('shiftStats') shiftStats: any;
  @Input('metricDefinitions') metricDefinitions: any;
  constructor() { }

  ngOnInit () {
  }

  filterMetric(metric) {
    return metric.showInMini === true;
  }

}
