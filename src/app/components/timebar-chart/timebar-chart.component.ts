import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges,
  SimpleChanges, ViewEncapsulation, EventEmitter, Output, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import * as crossfilter from 'crossfilter2';
import { ProductionExplorerService } from 'app/services/production-explorer.service';

const MarginTop = 30;
const DaysGap = 10;

@Component({
  selector: 'app-timebar-chart',
  templateUrl: './timebar-chart.component.html',
  styleUrls: ['./timebar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimebarChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input('filterStart') filterStartDate = new Date(2019, 8, 10);
  @Input('filterEnd') filterEndDate = new Date(2019, 10, 10);
  @Output() filterChange = new EventEmitter();
  @ViewChild('timebarChart') chartDiv: ElementRef;
  chart;
  dimension;
  group;
  xScale;
  yScale;
  barWidth = 0;
  brush;
  filterStartPoint = 0;
  filterEndPoint = 0;
  isDrawing = false;
  height = 0;
  startDate = new Date(2017, 11, 10);
  axisStartDate = new Date(2018, 0, 1);
  endDate = new Date();
  mainData = [];
  explorerDataSub$;
  checkInterval;

  constructor(private productionExplorerService: ProductionExplorerService) {
    this.startDate = this.productionExplorerService.startDate;
    this.endDate = this.productionExplorerService.endDate;
    this.axisStartDate = new Date(this.startDate.getTime() + DaysGap * 24 * 60 * 60 * 1000);
    this.explorerDataSub$ = this.productionExplorerService.explorerDataSub$.subscribe(data => {
      if (data.explorerData.length > 0) {
        if (this.dimension) {
          this.dimension.dispose();
        }
        this.dimension = crossfilter(data.explorerData).dimension((d: any) => d3.timeDay(new Date(d.date)));
        this.group = this.dimension.group();
        if (this.checkInterval) {
          clearInterval(this.checkInterval);
        }
        if (this.chart) {
          this.initDraw();
        } else {
          this.checkInterval = setInterval(() => {
            if (this.chart) {
              clearInterval(this.checkInterval);
              this.initDraw();
            }
          }, 300);
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.explorerDataSub$.unsubscribe();
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart) {
      const localStart = Math.floor(this.filterStartPoint);
      const localEnd = Math.floor(this.filterEndPoint);
      const parentStart = Math.floor(this.xScale(changes.filterStartDate.currentValue));
      const parentEnd = Math.floor(this.xScale(changes.filterEndDate.currentValue));
      if (localStart !== parentStart || localEnd !== parentEnd) {
        this.filterStartPoint = this.xScale(this.filterStartDate);
        this.filterEndPoint = this.xScale(this.filterEndDate);
        this.moveBrush();
        this.reDrawBrushBack();
        this.drawChart();
      }
    }
  }

  ngAfterViewInit() {
    const formatMonth = d3.timeFormat('%b');
    const formatYear = d3.timeFormat('%Y');
    const width = this.chartDiv.nativeElement.offsetWidth;
    this.height = this.chartDiv.nativeElement.offsetHeight;
    this.xScale = d3.scaleTime().range([0, width]).domain([this.startDate, this.endDate]);
    this.yScale = d3.scaleLinear().range([this.height - MarginTop, 0]);
    this.chart = d3.select(this.chartDiv.nativeElement).append('svg').attr('width', width).attr('height', this.height);
    const monthArray = d3.timeMonth.range(this.axisStartDate, this.endDate, 3);
    const yearsArray = d3.timeYear.range(this.axisStartDate, this.endDate);
    const daysArray = d3.timeDay.range(this.axisStartDate, this.endDate);
    this.barWidth = width / daysArray.length;

    this.filterStartPoint = this.xScale(this.filterStartDate);
    this.filterEndPoint = this.xScale(this.filterEndDate);
    this.brush = d3.brushX().extent([[0, 0], [width, this.height]]).on('brush end', this.reDrawChart);
    this.chart.append('rect')
      .attr('class', 'brush-back')
      .attr('x', this.filterStartPoint)
      .attr('y', 0)
      .attr('width', this.filterEndPoint - this.filterStartPoint);

    this.chart.append('g')
      .attr('class', 'main-content')
      .attr('transform', `translate(0, ${MarginTop})`);
    this.chart.append('g')
      .attr('class', 'x-axis-month')
      .attr('transform', `translate(0, ${this.height - 7})`)
      .selectAll('text')
      .data(monthArray)
      .enter().append('text')
      .attr('x', (d) => this.xScale(d) - 8)
      .text(d => formatMonth(d));
    this.chart.append('g')
      .attr('class', 'x-axis-year')
      .attr('transform', `translate(0, ${this.height - 70})`)
      .selectAll('text')
      .data(yearsArray)
      .enter().append('text')
      .attr('x', (d) => this.xScale(d) - 14)
      .text(d => formatYear(d));
    this.chart.append('g').attr('class', 'brush')
      .call(this.brush)
      .call(this.brush.move, [this.filterStartPoint, this.filterEndPoint]);
  }

  initDraw() {
    this.setYScale();
    this.drawChart();
  }

  reDrawChart = () => {
    if (this.group) {
      const newPoint = d3.event.selection;
      this.filterStartPoint = newPoint[0];
      this.filterEndPoint = newPoint[1];
      this.reDrawBrushBack();
      if (!this.isDrawing) {
        this.isDrawing = true;
        setTimeout(() => {
          const objectPoint = {
            start: this.xScale.invert(this.filterStartPoint),
            end: this.xScale.invert(this.filterEndPoint)
          };
          this.filterChange.emit(objectPoint);
          this.drawChart();
          this.isDrawing = false;
        }, 300);
      }
    }
  }

  moveBrush() {
    const brushGr = this.chart.select('.brush');
    brushGr.call(this.brush.move, [this.filterStartPoint, this.filterEndPoint]);
  }

  reDrawBrushBack() {
    this.chart.select('.brush-back')
    .attr('x', this.filterStartPoint)
    .attr('width', this.filterEndPoint - this.filterStartPoint);
  }

  setYScale() {
    this.yScale.domain([0, this.group.top(1)[0].value]);
  }

  drawChart() {
    const bars = this.chart.select('.main-content')
      .selectAll('.bar')
      .remove()
      .exit()
      .data(this.group.all());

    bars.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.xScale(d.key))
      .attr('y', (d) => this.yScale( d.value))
      .attr('height', (d) => this.height - MarginTop - this.yScale(d.value))
      .attr('width', this.barWidth)
      .attr('fill', (d) => {
        if (this.xScale(d.key) < this.filterStartPoint || this.xScale(d.key) > this.filterEndPoint) {
          return '#73757A';
        }
        return '#40699A';
      });
  }

}
