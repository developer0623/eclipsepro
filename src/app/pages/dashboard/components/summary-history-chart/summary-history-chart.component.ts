import { Component, OnInit, AfterViewInit,  Input, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { IMetricDefinition, IHistVal} from 'app/models/dto';

@Component({
  selector: 'app-summary-history-chart',
  templateUrl: './summary-history-chart.component.html',
  styleUrls: ['./summary-history-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SummaryHistoryChartComponent implements OnInit, AfterViewInit {
  @Input('isReverse') isReverse = true;
  @Input('metric') metric: IMetricDefinition;
  @Input('value') value;
  @Input('histories') histories: IHistVal[] = [];
  @ViewChild('myGraph') myGraph: ElementRef;
  valueBgCol = ['#c1272d', '#4d4d4d', '#2f7852'];
  chartEl;

  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.chartEl = this.myGraph.nativeElement;
    this.drawGraph();
  }
  getValueState () {
    if (this.value < this.metric.okRangeStart) {
      return 0;
    }

    if (this.value < this.metric.okRangeEnd) {
      return 1;
    }
    return 2;
  }

  getMarkerColor() {
    const state = this.getValueState();
    let bgCol = '';
    if (this.isReverse) {
      bgCol = this.valueBgCol[2 - state];
    } else {
      bgCol = this.valueBgCol[state];
    }
    return bgCol;
  }


  drawGraph() {
    const margin = {top: 5, right: 5, bottom: 7, left: 5};
    const width = this.chartEl.clientWidth - margin.left - margin.right;
    const height = this.chartEl.clientHeight - margin.top - margin.bottom;

    const hisLength = this.histories.length;
    const x = d3.scaleLinear().domain([0, hisLength - 1]).range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    y.domain([0, d3.max(this.histories, (d: IHistVal) => d.value)]);

    const valueline = d3.line()
        .x((d, i) => x(i))
        .y((d: IHistVal) => y(d.value))
        .curve(d3.curveMonotoneX);

    const svg = d3.select(this.chartEl)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const markerCol = this.getMarkerColor();
    const markgerId = `circle${this.metric.metricName}`;
    svg.append('svg:defs').append('svg:marker')
      .attr('id', markgerId)
      .attr('refX', 6)
      .attr('refY', 6)
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('orient', 'auto')
      .attr('viewBox', '0 0 12 12')
      .append('circle')
      .attr('cx', 6)
      .attr('cy', 6)
      .attr('r', 3)
      .attr('fill', markerCol);

    svg.append('path')        // Add the valueline path.
      .attr('class', 'line')
      .attr('d', valueline(this.histories))
      .attr('marker-end', `url(#${markgerId})`);
  }

}
