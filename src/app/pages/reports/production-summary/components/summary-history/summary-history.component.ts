import { Component, ViewChild, ElementRef, Input, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-summary-history',
  templateUrl: './summary-history.component.html',
  styleUrls: ['./summary-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SummaryHistoryComponent implements OnInit, AfterViewInit {
  static markerId = 0;
  @ViewChild('historyGraph') myGraph: ElementRef;
  @Input('isReverse') isReverse = false;
  @Input('data') data;
  valueBgCol = ['#c1272d', '#4d4d4d', '#2f7852'];
  chartEl;
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.chartEl = this.myGraph.nativeElement;
    if (this.data.history) {
      this.drawGraph();
    }
  }

  getValueState () {
    if (this.data.bullet) {
      if (this.data.bullet.value < this.data.bullet.okRangeStart) {
        return 0;
      }
      if (this.data.bullet.value < this.data.bullet.okRangeEnd) {
        return 1;
      }
      return 2;
    }
    return 1;
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
    const hisLength = this.data.history.length;
    const x = d3.scaleLinear().domain([0, hisLength - 1]).range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    y.domain([0, d3.max(this.data.history, (d) => d.value)]);

    const valueline = d3.line()
      .x((d, i) => x(i))
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    const svg = d3.select(this.chartEl)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const markerCol = this.getMarkerColor();
    const markgerId = `circle${SummaryHistoryComponent.markerId}`;
    SummaryHistoryComponent.markerId++;
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
      .attr('d', valueline(this.data.history))
      .attr('marker-end', `url(#${markgerId})`);
  }

}
