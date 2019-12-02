import { Component, OnInit, Input } from '@angular/core';
import { IMetricDefinition, IRollformingStatistics, IHistVal} from 'app/models/dto';
@Component({
  selector: 'app-machine-summary',
  templateUrl: './machine-summary.component.html',
  styleUrls: ['./machine-summary.component.scss']
})
export class MachineSummaryComponent implements OnInit {
  @Input('metric') metric: IMetricDefinition;
  @Input('statistics') statistics: IRollformingStatistics;
  @Input('histories') histories: IHistVal[] = [];
  isReverse = true;

  constructor() { }

  ngOnInit() {
    this.isReverse = this.metric.metricName === 'Scrap';
  }

}
