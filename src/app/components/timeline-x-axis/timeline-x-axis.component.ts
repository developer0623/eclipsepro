import {
  Component, OnInit, AfterViewInit,  Input, ElementRef, ViewChild,
  OnChanges, SimpleChanges, SimpleChange
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-timeline-x-axis',
  templateUrl: './timeline-x-axis.component.html',
  styleUrls: ['./timeline-x-axis.component.scss']
})
export class TimelineXAxisComponent implements OnInit, AfterViewInit, OnChanges {
  @Input('displayXDomain') displayXDomain;
  @Input('height') height;
  @Input('width') width;
  @Input('cursorTime') cursorTime;
  @ViewChild('timeline') timeline: ElementRef;
  chartEl;
  drawFlag = false;
  scaleWidth;
  scaleHeight;
  xValDomain;
  xScale;
  gCursor;
  xAxis;
  gxAxis;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    const displayXDomain: SimpleChange = changes.displayXDomain;
    if (!displayXDomain.isFirstChange() && displayXDomain.currentValue !== displayXDomain.previousValue) {
      const newScale = d3.scaleTime().range([0, this.scaleWidth]).domain(displayXDomain.currentValue);
      this.drawCursor(newScale);
    }
  }

  ngAfterViewInit () {
    const paddingTop = 0;
    const paddingRight = 0;
    const paddingBottom = 40;
    const paddingLeft = 0;
    this.chartEl = this.timeline.nativeElement;
    this.scaleWidth = this.width - paddingLeft - paddingRight;
    this.scaleHeight = this.height - paddingTop - paddingBottom;
    this.xValDomain = this.displayXDomain;

    // Create the x and y scales (interpolation tables between data values and SVG x & y coordinates)
    this.xScale = d3.scaleTime().range([0, this.scaleWidth]).domain(this.xValDomain);

    const formatMillisecond = d3.timeFormat('.%L');
    const formatSecond = d3.timeFormat(':%S');
    const formatMinute = d3.timeFormat('%I:%M');
    const formatHour = d3.timeFormat('%I %p');
    const formatDay = d3.timeFormat('%a %d');
    const formatWeek = d3.timeFormat('%b %d');
    const formatMonth = d3.timeFormat('%B');
    const formatYear = d3.timeFormat('%Y');

    // Define filter conditions
    function multiFormat(date) {
      return (d3.timeSecond(date) < date ? formatMillisecond
        : d3.timeMinute(date) < date ? formatSecond
        : d3.timeHour(date) < date ? formatMinute
        : d3.timeDay(date) < date ? formatHour
        : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
        : d3.timeYear(date) < date ? formatMonth
        : formatYear)(date);
    }
    this.xAxis = d3.axisBottom().scale(this.xScale).tickFormat(multiFormat);

    // **************************************
    // Setup SVG chart basic structure
    // Z-order note: last defined = top
    // **************************************

    const svg = d3.select(this.chartEl).append('svg').attr('width', this.width).attr('height', this.height).attr('font-size', '10');
    svg.append('defs').append('clipPath').attr('id', 'clip').append('rect').attr('width', this.scaleWidth).attr('height', '100%');

    const gChart = svg.append('g').attr('transform', 'translate(' + paddingLeft + ',' + paddingTop + ')')
                  .attr('width', this.scaleWidth).attr('height', this.scaleHeight).attr('clip', 'url(#clip)');

    this.gxAxis = gChart.append('g').attr('class', 'xAxis').attr('transform', 'translate(0,' + this.scaleHeight + ')');

    const gMain = gChart.append('g').attr('class', 'main').attr('height', this.scaleHeight);

    // **************************************
    // Setup cursor
    // **************************************
    this.gCursor = gMain.append('g').attr('class', 'cursor').append('line').attr('y1', 0.0).attr('y2', this.height);
    this.drawCursor(this.xScale);
    setInterval(this.advanceCursorTime.bind(this), 1000);
  }

  drawCursor(scale) {
    const x = scale(this.cursorTime);
    this.gCursor.attr('x1', x);
    this.gCursor.attr('x2', x);
  }

  advanceCursorTime () {
    this.cursorTime = Date.now();
    this.draw();
  }

  draw() {
    // this.drawCursor();
    this.xAxis.scale(this.xScale);
    this.gxAxis.call(this.xAxis);

   //  if (this.drawFlag) {
   //     // x axis
   //     // x axis tick  has four format,the rule as below:
   //     // 1. if domain width of tick span less than 1000ms, then tick format is hh:mm:ss.mmm, the tick span width is 80px;
   //     // 2. if domain width of tick span less than 60 second, then tick format is hh:mm:ss.m, the tick span width is 70px;
   //     // 3. if domain width of tick span less than 1 hour, then tick format is hh:mm:ss, the tick span width is 60px;
   //     // 4. if domain width of tick span greater than 1 hour, then tick format is hh:mm, the tick span width is 50px;

   //     let tickRoundMs = 0;
   //     const tickSpanMs = 80, tickSpan100Ms = 70, tickSpanS = 60, tickSpanMin = 50;
   //     let tickStep = 0;
   //     const xDomainWidth = this.xValDomain[1] - this.xValDomain[0];

   //     if ((xDomainWidth) / (this.scaleWidth / tickSpanMs) <= 1000) {
   //        // format is hh:mm:ss.mmm
   //        tickStep = (xDomainWidth) / (this.scaleWidth / tickSpanMs);
   //        tickRoundMs = 1;
   //     } else if ((xDomainWidth) / (this.scaleWidth / tickSpan100Ms) <= 1 * 60 * 1000) {
   //        // format is hh:mm:ss.m
   //        tickStep = (xDomainWidth) / (this.scaleWidth / tickSpan100Ms);
   //        tickRoundMs = 100;
   //     } else if ((xDomainWidth) / (this.scaleWidth / tickSpanS) <= 1 * 3600 * 1000) {
   //        // format is hh:mm:ss
   //        tickStep = (xDomainWidth) / (this.scaleWidth / tickSpanS);
   //        tickRoundMs = 1000;
   //     } else {
   //        // format is hh:mm
   //        tickStep = (xDomainWidth) / (this.scaleWidth / tickSpanMin);
   //        tickRoundMs = 1000 * 60;
   //     }

   //     // offset tickStep/2 tick width, avoid first or last tick label outside of chart
   //     const ticks = d3.range(this.xValDomain[0].getTime() + tickStep / 2, this.xValDomain[1].getTime() - tickStep / 2, tickStep)
   //     .map((d) => {
   //        d = Math.round(d / tickRoundMs) * tickRoundMs;
   //        return new Date(d);
   //     });

   //     const zxAxis = d3.svg.axis().scale(this.xScale).orient('bottom').tickValues(ticks).tickFormat((d) => {

   //        let s = '';
   //        switch (tickRoundMs) {
   //           case 1:
   //              s = d3.time.format('%H:%M:%S.%L')(d);
   //              break;
   //           case 100:
   //              s = d3.time.format('%H:%M:%S.%L')(d);
   //              s = s.substring(0, s.length - 2);
   //              break;
   //           case 1000:
   //              s = d3.time.format('%H:%M:%S')(d);
   //              break;
   //           default:
   //              s = d3.time.format('%H:%M')(d);
   //        }
   //        return s;
   //     });
   //     // gxAxis.call(xAxis);
   //  }
  }

}
