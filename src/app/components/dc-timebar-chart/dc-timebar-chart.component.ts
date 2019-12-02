import {
  Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges,
  SimpleChanges, SimpleChange
} from '@angular/core';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-dc-timebar-chart',
  templateUrl: './dc-timebar-chart.component.html',
  styleUrls: ['./dc-timebar-chart.component.scss']
})
export class DcTimebarChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input('dimension') dimension;
  @Input('group') group;
  @Input('startDate') startDate = new Date(2017, 11, 10);
  @Input('endDate') endDate = new Date();
  @ViewChild('dcTimeChart') chartDiv: ElementRef;
  chart: dc.BarChart;
  xScale;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart) {
      const startPrevVal = changes.startDate.previousValue;
      const startCurVal = changes.startDate.currentValue;
      const endPrevVal = changes.endDate.previousValue;
      const endCurVal = changes.endDate.currentValue;
      if (startPrevVal !== startCurVal || endPrevVal !== endCurVal) {
        this.drawChart();
      }
    }
  }

  ngAfterViewInit() {
    this.chart = dc.barChart(this.chartDiv.nativeElement);
    this.xScale = d3.scaleTime().domain([this.startDate, this.endDate]);
    this.chart
      .dimension(this.dimension)
      .group(this.group)
      .ordinalColors(['#40699A'])
      .brushOn(false)
      // .elasticX(true)
      .elasticY(true)
      .x(this.xScale)
      .width(this.chartDiv.nativeElement.offsetWidth)
      .height(this.chartDiv.nativeElement.offsetHeight)
      .margins({top: 10, right: 10, bottom: 20, left: 40})
      .xUnits(d3.timeDays)
      .round(d3.timeDay.round)
      .gap(1);
    this.chart.render();
  }

  drawChart() {
    this.xScale = d3.scaleTime().domain([this.startDate, this.endDate]);
    this.chart
      .x(this.xScale)
      // .label(d => d.key);
    this.chart.render();
  }

}
