import {
  Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import * as dc from 'dc';

@Component({
  selector: 'app-dc-pareto-chart',
  templateUrl: './dc-pareto-chart.component.html',
  styleUrls: ['./dc-pareto-chart.component.scss']
})
export class DcParetoChartComponent implements OnInit, AfterViewInit {
  @Input('dimension') dimension;
  @Input('group') group;
  @Input('topCount') topCount = 0;
  @Input('title') title = '';
  @ViewChild('paretoChart') chartDiv: ElementRef;
  chart: dc.BarChart;

  constructor() {}

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.chart = dc.rowChart(this.chartDiv.nativeElement);
    this.chart
      .ordinalColors(['#40699A'])
      .elasticX(true)
      .width(this.chartDiv.nativeElement.offsetWidth)
      .margins({top: 10, right: 10, bottom: 20, left: 10})
      .gap(2)
      .cap(this.topCount)
      .dimension(this.dimension)
      .group(this.group)
      .label(d => d.key);
      this.chart.render();
  }

  reset() {
    this.chart.filterAll();
    dc.redrawAll();
  }

}
