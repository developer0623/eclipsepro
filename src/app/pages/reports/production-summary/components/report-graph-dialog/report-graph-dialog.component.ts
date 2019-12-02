import { Component, ViewChild, ElementRef, Inject, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as d3 from 'd3';

export interface DialogData {
  content: any;
  state: number;
  machine: string;
}

@Component({
  selector: 'app-report-graph-dialog',
  templateUrl: './report-graph-dialog.component.html',
  styleUrls: ['./report-graph-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportGraphDialogComponent implements OnInit, AfterViewInit {
  static markerId = 0;
  @ViewChild('popoverGraph') myGraph: ElementRef;
  state = 0;
  unit = '';
  primary;
  chartEl;
  machine = '';
  content;
  valueBgCol = ['#c1272d', '#4d4d4d', '#2f7852'];

  constructor(public dialogRef: MatDialogRef<ReportGraphDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    const { content, state, machine } = this.data;
    this.state = state;
    this.machine = machine;
    this.content = content;
    if (this.state === 0) {
      this.primary = content.primary;
      this.unit = 'FT';
    } else if (this.state === 1) {
      this.primary = content.primary;
      this.unit = '%';
    } else {
      this.primary = (content.primary * 100).toFixed(1);
      this.unit = '%';
    }
  }

  ngAfterViewInit() {
    this.chartEl = this.myGraph.nativeElement;
    if (this.content.history) {
      this.drawGraph();
    }
  }

  getValueState () {
    if (this.content.bullet) {
      if (this.content.bullet.value < this.content.bullet.okRangeStart) {
        return 0;
      }
      if (this.content.bullet.value < this.content.bullet.okRangeEnd) {
        return 1;
      }
      return 2;
    }
    return 1;
  }

  getMarkerColor() {
    const state = this.getValueState();
    let bgCol = '';
    if (this.state) {
      bgCol = this.valueBgCol[2 - state];
    } else {
      bgCol = this.valueBgCol[state];
    }
    return bgCol;
  }

  drawGraph() {
    const margin = {top: 30, right: 20, bottom: 30, left: 50};
    const width = this.chartEl.clientWidth - margin.left - margin.right;
    const height = this.chartEl.clientHeight - margin.top - margin.bottom;
    const hisLength = this.content.history.length;
    const x = d3.scaleLinear().domain([0, hisLength - 1]).range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    y.domain([0, d3.max(this.content.history, (d) => d.value)]);

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
    const markgerId = `circle${ReportGraphDialogComponent.markerId}`;
    ReportGraphDialogComponent.markerId++;
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
      .attr('d', valueline(this.content.history))
      .attr('marker-end', `url(#${markgerId})`);
  }

}
