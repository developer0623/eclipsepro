import {
  Component, Input, ViewChild, EventEmitter, Output,
  OnInit, OnDestroy,
  ElementRef,
  ViewEncapsulation,
  OnChanges, SimpleChanges, SimpleChange
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-timeline-block',
  templateUrl: './timeline-block.component.html',
  styleUrls: ['./timeline-block.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineBlockComponent implements OnInit, OnDestroy, OnChanges {
  @Input('name') name;
  @Input('machineNumber') machineNumber;
  @Input('displayXDomain') displayXDomain;
  @Input('height') height;
  @Input('width') width;
  @Input('radius') radius;
  @Input('data') data = [];
  @Input('searchText') searchText;
  @Input('showXAxis') showXAxis;
  @Input('brushOutput') brushOutput;
  @Input('cursorTime') cursorTime;
  @Output() domainChange = new EventEmitter();
  @ViewChild('timeblock') timeblock: ElementRef;

  chartEl;
  scaleWidth;
  scaleHeight;
  xValDomain;
  xScale;
  tooltip;
  inZoom = false;
  gChart;
  gMain;
  gCursor;
  zoom;

  constructor() { }

  ngOnDestroy() {
    console.log('destory');
  }

  ngOnChanges(changes: SimpleChanges) {
    const displayXDomain: SimpleChange = changes.displayXDomain;
    if (!displayXDomain.isFirstChange() && displayXDomain.currentValue !== displayXDomain.previousValue) {
      const newScale = d3.scaleTime().range([0, this.scaleWidth]).domain(displayXDomain.currentValue);
      this.drawCursor(newScale);
      this.update(newScale);
    }
  }

  ngOnInit () {
    const paddingTop = 0;
    const paddingRight = 0;
    const paddingBottom = this.showXAxis ? 40 : 0;
    const paddingLeft = 0;
    this.chartEl = this.timeblock.nativeElement;
    this.scaleWidth = this.width - paddingLeft - paddingRight;
    this.scaleHeight = this.height - paddingTop - paddingBottom;
    this.xValDomain = this.displayXDomain ||
      [
        d3.min(this.data, (d: any) => new Date(d.startDateTime)),
        d3.max(this.data, (d: any) => new Date(d.endDateTime))
      ];
    this.xScale = d3.scaleTime().range([0, this.scaleWidth]).domain(this.xValDomain);

    const svg = d3.select(this.chartEl).append('svg').attr('width', this.width).attr('height', this.height).attr('font-size', '10');
    const defs = svg.append('defs');
    defs.append('clipPath').attr('id', 'clip').append('rect').attr('width', this.scaleWidth).attr('height', '100%');
    const coilWarnPattern = defs.append('pattern').attr('id', 'pattern-coilwarn').attr('width', '10').attr('height', '10')
      .attr('patternTransform', 'rotate(60 0 0)').attr('patternUnits', 'userSpaceOnUse');

    coilWarnPattern.append('rect').attr('x', '0').attr('y', '0').attr('width', '10').attr('height', '10').style('fill', '#F2D20C');
    coilWarnPattern.append('line').attr('x1', '0').attr('y1', '0').attr('x2', '0')
      .attr('y2', '0').style('stroke', '#D32F2F').style('stroke-width', '10');

    this.gChart = svg.append('g').attr('transform', 'translate(' + paddingLeft + ',' + paddingTop + ')')
                  .attr('width', this.scaleWidth).attr('height', this.scaleHeight).attr('clip', 'url(#clip)');

    this.gChart.append('rect').attr('class', 'chartbody').attr('width', '100%').attr('height', '100%').attr('y', '1');

    this.gMain = this.gChart.append('g').attr('class', 'timeBlock').attr('height', this.scaleHeight);

    const gBrush = this.gMain.append('g').attr('class', 'brush');

    this.tooltip = d3.select('body').append('div')
             .attr('class', 'eventToolTip')
             .attr('position', 'absolute')
             .style('opacity', 0);
    if (this.brushOutput) {
      // const brush = d3.svg.brush().x(this.xScale).extent(this.brushOutput).on('brushend', () => {
      //   if (!brush.empty()) {
      //     this.brushOutput = brush.extent();
      //   }
      // });
      // gBrush.attr('fill-opacity', 0.125).call(brush);
      // gBrush.selectAll('rect').attr('height', '100%');
    } else {
      // Setup zoom and pan behavior (since we're not a brush/range display)
      this.zoom = d3.zoom().scaleExtent([0.1, 30])
        .on('zoom', () => this.zoomHandler())
        .on('start', () => this.zoomStart())
        .on('end', () => this.zoomEnd());
      svg.call(this.zoom).on('dblclick.zoom', null);
    }
    this.gCursor = this.gChart.append('g').attr('class', 'cursor').append('line').attr('y1', 0.0).attr('y2', '100%');
    this.drawCursor(this.xScale);

    this.data = this.data.slice().sort((x, y) => d3.ascending(this.zIndexMap(x), this.zIndexMap(y)));
    this.draw();

  }

  zoomStart() {
    this.tooltip.transition()
    .style('opacity', 0);
    // this.inZoom = true;
  }
  zoomEnd() {
    this.tooltip.transition()
    .duration(2000)
    .style('opacity', 1);
    this.inZoom = false;
   }

  zoomHandler() {
    const currentTransform = d3.event.transform;
    const newScale = currentTransform.rescaleX(this.xScale);
    this.domainChange.emit(newScale.domain());
  }

  drawCursor(scale) {
    const x = scale(this.cursorTime);
    this.gCursor.attr('x1', x);
    this.gCursor.attr('x2', x);
  }

  tooltipMap(d) {
    const startDate = new Date(d.startDateTime);
    const endDate = new Date(d.endDateTime);
    let startHours = startDate.getHours();
    let startMinutes: any = startDate.getMinutes();
    const startampm = startHours >= 12 ? 'PM' : 'AM';
    startHours = startHours % 12;
    startHours = startHours ? startHours : 12; // the hour '0' should be '12'
    startMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes;
    const startTime = `<span style="font-weight:600;font-size:15px">${startHours}:${startMinutes}</span>
      <span style="font-size:11px;font-weight:600;">${startampm}</span>`;

    let endHours = endDate.getHours();
    let endMinutes: any = endDate.getMinutes();
    const endampm = endHours >= 12 ? 'PM' : 'AM';
    endHours = endHours % 12;
    endHours = endHours ? endHours : 12; // the hour '0' should be '12'
    endMinutes = endMinutes < 10 ? '0' + endMinutes : endMinutes;
    const endTime = `<span style="font-weight:600;font-size:15px">${endHours}:${endMinutes}</span>
      <span style="font-size:11px;font-weight:600;">${endampm}</span>`;

    const formatStartDate = startDate.getMonth() + 1 + '/' + startDate.getDate() + '/' + startDate.getFullYear().toString().substr(2, 2);
    const formatendDate = endDate.getMonth() + 1 + '/' + endDate.getDate() + '/' + endDate.getFullYear().toString().substr(2, 2);
    const durationMins = Math.floor(d.durationMs / (1000 * 60)) % 60;
    const durationHours = Math.floor(d.durationMs / (1000 * 60 * 60)) % 24;
    const durationDays = Math.floor(d.durationMs / (1000 * 60 * 60 * 24));

    const daysText = durationDays !== 0  ? `<span class="duration">${durationDays}</span><span class="durationTime">d</span>` : '';

    const hoursText = durationHours !== 0  ? '<span class="duration">' + durationHours + '</span><span class="durationTime">h</span>' : '';

    const timeBlock =
      `<div class="brdr-top">
        <table>
          <tr>
            <td>
              <div class="mrgnRght">${formatStartDate}</div>
              <div class="grnBrdr">${startTime}</div>
            </td>
            <td>
              <div class="mrgnRght">&nbsp;</div>
              <span class="greenClr">
                ${daysText} ${hoursText}
                <span class="duration">${durationMins}</span>
                <span class="durationTime">m</span>
              </span>
            </td>
            <td>
              <div class="mrgnRght">${formatendDate}</div>
              <div class="grnBrdr">${endTime}</div>
            </td>
          </tr>
        </table>
      </div>`;
    let activityTitle;
    switch (d.activityType) {
      case 'ToolAndMaterialChange':
        activityTitle = 'Tool And Material Change';
        break;
      case 'ToolChange':
        activityTitle = 'Tool Change';
        break;
      case 'MachineConfig':
        activityTitle = 'Machine Config';
        break;
      case 'MaterialChange':
        activityTitle = 'Material Change';
        break;
      case 'CoilChange':
        activityTitle = 'Coil Change';
        break;
      case 'Maintenance':
        activityTitle = 'Maintenance';
        break;
      case 'Breakdown':
        activityTitle = 'Breakdown';
        break;
      case 'Production':
        activityTitle = 'Production';
        break;
      case 'Unscheduled':
        activityTitle = 'Unscheduled';
        break;
      case 'Break':
        activityTitle = 'Break';
        break;
      case 'Meeting':
        activityTitle = 'Meeting';
        break;
      default:
        activityTitle = d.activityType + ' - ' + d.title;
        break;
    }

    if (d.activityType === 'Production') {
      const orderCode = d.orderCode;
      const customerName = d.customerName;
      let totalFt;
      let remainingFt;
      if (d.totalFt) {
        totalFt = Math.round(d.totalFt).toLocaleString();
      }
      if (d.remainingFt) {
        remainingFt = Math.round(d.remainingFt).toLocaleString();
      }
      const percentageComplete = Math.round((d.totalFt - d.remainingFt) / d.totalFt * 100);
      return `
        <div class="scheduleTooltip" style="color:#8FAE17; text-transform:uppercase;font-size:11px;padding-bottom:3px;">
          ${activityTitle}
        </div>
        <div style="font-weight:600;color:#000000">${orderCode}</div>
        <div>${customerName}</div>${timeBlock}
        <div style="margin-top:10px">
          <table class="innerTable">
            <tr><th>TOTAL Ft</th><th>REMAINING Ft</th><th>PERCENTAGE</th></tr>
            <tr><td>${totalFt}</td><td>${remainingFt}</td><td>${percentageComplete}</td></tr>
          </table>
        </div>`;
    } else if (d.activityType === 'ToolAndMaterialChange' || d.activityType === 'MachineConfig'
      || d.activityType === 'MaterialChange' || d.activityType === 'ToolChange') {
      return `
        <div style="color:#F68B1F; text-transform:uppercase;font-size:11px;padding-bottom:3px;">${activityTitle}</div>${timeBlock}
        <div style="margin-top:10px">
          <table class="innerTable">
            <tr><th style="width:50%;">MATERIAL</th><th>TOOLING</th></tr>
            <tr><td>${d.materialCode}</td><td>${d.toolingCode}</td></tr>
          </table>
        </div>`;
    } else if (d.activityType === 'Unscheduled') {
      return `
        <div style="color:#000000; text-transform:uppercase;font-size:11px;padding-bottom:3px;">${activityTitle}</div>
        ${timeBlock}
        <div style="margin-top:10px">
          <table class="innerTable">
            <tr><th>TITLE</th></tr>
            <tr><td>${d.title}</td></tr>
          </table>
        </div>`;
    } else if (d.activityType === 'Break') {
      return `
        <div style="color:#0071B5; text-transform:uppercase;font-size:11px;padding-bottom:3px;">${activityTitle}</div>
        ${timeBlock}
        <div style="margin-top:10px">
          <table class="innerTable">
            <tr><th>TITLE</th></tr>
            <tr><td>${d.title}</td></tr>
          </table>
        </div>`;
    } else if (d.activityType === 'Meeting') {
      return `<div style="color:#11897D; text-transform:uppercase;font-size:11px;padding-bottom:3px;">${activityTitle}</div>${timeBlock}
       <div style="margin-top:10px">
        <table class="innerTable">
          <tr><th style="width:0;">TITLE</th></tr>
          <tr><td>${d.title}</td></tr>
        </table>
      </div>`;
    } else if (d.activityType === 'CoilChange') {
      const coilId = d.coilUsed && d.coilUsed.coilId || '«none»';
      const coilFt = d.coilUsed && Math.round(d.coilUsed.coilFt).toLocaleString() || '';
      return `
        <div style="color:#F2D20C; text-transform:uppercase;font-size:11px;padding-bottom:3px;">${activityTitle}</div>${timeBlock}
        <div style="margin-top:10px">
          <table class="innerTable">
            <tr><th>MATERIAL</th><th>PREFERRED COIL</th><th>REMAINING Ft</th></tr>
            <tr><td>${d.materialCode}</td><td>${coilId}</td><td>${coilFt}</td></tr>
          </table>
        </div>`;
    } else if (d.activityType === 'Maintenance') {
      return `
        <div style="color:#74592E; text-transform:uppercase;font-size:11px;padding-bottom:3px;">${activityTitle}</div>${timeBlock}
        <div style="margin-top:10px;">
          <table class="innerTable"><tr><th style="width:0;">TITLE</th></tr><tr><td>${d.title}</td></tr></table>
        </div>`;
    } else if (d.activityType === 'Breakdown') {
      return `<div style="color:#942015; text-transform:uppercase;font-size:11px;padding-bottom:3px;">${activityTitle}</div>${timeBlock}
      <div style="margin-top:10px;">
        <table class="innerTable"><tr><th style="width:0;">TITLE</th></tr><tr><td>${d.title}</td></tr></table>
      </div>`;
    } else {
      return '<div style="color:#000000; text-transform:uppercase;font-size:11px;padding-bottom:3px;">${activityTitle}</div>' + timeBlock;
    }
  }

  blockHeightMap(d) {
    const { activityType } = d;
    switch (activityType) {
      case 'Break':
      case 'Meeting':
        return '43.3%';
      case 'CoilChange':
        return '30%';
      case 'Unscheduled':
        return '47%';
      case 'Maintenance':
      case 'ToolAndMaterialChange':
      case 'Breakdown':
      case 'MachineConfig':
      case 'MaterialChange':
      case 'ToolChange':
        return '85%';
      case 'Production':
        return '58.3%';
      default:
        return '20%';
    }
  }

  position(d) {
    const { activityType } = d;
    switch (activityType) {
      case 'Production':
      case 'CoilChange':
      case 'Maintenance':
      case 'Breakdown':
        return '6';
      case 'ToolAndMaterialChange':
      case 'MaterialChange':
      case 'MachineConfig':
      case 'ToolChange':
        return '7';
      case 'Unscheduled':
        return '-1';
      case 'Break':
      case 'Meeting':
        return '0';
      default:
        return '20';
    }
  }

  textPosition(d) {
    if (d.activityType === 'Production') {
      return '34';
    } else if (d.activityType === 'MachineConfig') {
      return '55';
    }
  }

  tspanPosition(d) {
    if (d.activityType === 'Production') {
      return '36';
    } else if (d.activityType === 'MachineConfig') {
      return '58';
    }
  }

  zIndexMap(d) {
    const { activityType } = d;
    switch (activityType) {
      case 'Unscheduled':
      case 'Break':
      case 'Meeting':
        return 5;
      case 'late':
        return 4;
      case 'CoilChange':
      case 'Maintenance':
      case 'Breakdown':
        return 3;
      case 'Production':
        return 2;
      case 'MaterialChange':
      case 'MachineConfig':
      case 'ToolChange':
      case 'ToolChange':
      case '':
        return 1;
      default:
        return 6;
    }
  }
  searchTextMap(d) { return d.orderCode + d.materialCode + d.toolingCode; }
  titleMap(d) { return d.orderCode + d.materialCode + d.toolingCode; }

  setLeftColor(d) {
    if (d.activityType === 'Production') {
      return '#8CAB12';
    }
    if (d.activityType === 'MachineConfig') {
      return '#F68B1F';
    }
  }
  setRightColor(d) {
    if (d.activityType === 'Production') {
      return '#BED75D';
    }
    if (d.activityType === 'MachineConfig') {
      return '#F1CE9F';
    }
  }

  warningMap(d) {
    if (!Array.isArray(d) || !d.length) {
      return '';
    }
    return d.map(w => w.toLowerCase()).join(' ');
  }

  draw() {
    const startDate = this.xValDomain[0];
    const endDate = this.xValDomain[1];
      // Sort data by z index

    // Data binding
    const timeBlocks = this.gMain.selectAll('svg')
      .data(this.data, (d: any) => {
          if ((endDate >= new Date(d.startDateTime) && startDate <= new Date(d.endDateTime))
          && ((this.xScale(new Date(d.endDateTime)) - this.xScale(new Date(d.startDateTime))) >= 2)) {
            return d.id;
          }
      });

    // Handle objects that were just added to the collection
    const blocksEnter = timeBlocks.enter().append('svg')
      .attr('x', (d) => {
        return this.xScale(new Date(d.startDateTime));
      })
      .attr('width', (d) => this.xScale(new Date(d.endDateTime)) - this.xScale(new Date(d.startDateTime)))
      .classed('muted', (d) => {
        const keysOfPrntObj =  Object.keys(d);
        let searchString = '';
        for (let i = 0; i < keysOfPrntObj.length; i ++) {
          if (d[keysOfPrntObj[i]] && keysOfPrntObj[i] !== 'remainingFt' &&  keysOfPrntObj[i] !== 'totalFt') {
            searchString += d[keysOfPrntObj[i]];
          }
        }
        return (this.searchText && searchString && !searchString.toLowerCase().includes(this.searchText.toLowerCase()));
      })
      .attr('y', 0)
      .attr('height', '100%')
      .on('mouseover', (d) => {
        this.tooltip.transition()
          .duration(200)
          .style('opacity', 1)
          .style('z-index', 1)
          .style('display', 'block');
        this.tooltip.html(this.tooltipMap(d));
      })
      .on('mousemove', (e) => {
        const tooltipHeight = this.tooltip._groups[0][0].clientHeight;
        const tooltipWidth = this.tooltip._groups[0][0].clientWidth;
        const graphInnerWidth = document.getElementById('graph-div').offsetWidth;
        const cursorPosition = d3.mouse(document.getElementById('graph-div'))[0];
        // tooltipPosOffset is initiated with 10px to show distance between cursor and tooltip.
        let tooltipPosOffset = 10;
        // checking if toottip will fit to right of cursor by comparing difference
        // between graph-div position and cursor position. If it is  less than tooltip width,
        // then changing tooltip position to left of cursor. Tooltip width was reduced
        // by another 20 px to make use of extra padding available for graph-div.
        if ((graphInnerWidth - cursorPosition) < (tooltipWidth - 20)) {
          tooltipPosOffset = -340;
        }
        return this.tooltip.style('top', ((<any>d3.event).pageY - tooltipHeight) + 'px')
        .style('left', ((<any>d3.event).pageX + tooltipPosOffset) + 'px');
      })
      .on('mouseout', (d) => {
        this.tooltip.transition()
          .style('z-index', 0)
          .duration(500)
          .style('display', 'none');
      })
      .on('dblclick', (d) => {
        if (d.activityType === 'MaterialChange' || d.activityType === 'MachineConfig'
          || d.activityType === 'Production' || d.activityType === 'CoilChange') {
          this.tooltip.transition()
            .style('z-index', 0)
            .style('display', 'none');
        }
        if (d.downtimeId !== 0) {
          // rootScope.$broadcast('openDowntimePopup', d);
        } else if (d.activityType === 'Production') {
          // state.go('app.orders.order', {id: d.ordId});
        } else if (d.activityType === 'MaterialChange' || d.activityType === 'MachineConfig' || d.activityType === 'CoilChange') {
          // state.go('app.inventory.coil-types.coil-type', {id: d.materialCode});
        } else if (d.downtimeId > 0) {
          console.log('Downtime:' + d.downtimeId);
          // state.go('app.inventory.coil-types.coil-type', {id: d.materialCode});
        }
      });

    const defs = blocksEnter.append('defs');
    const filter = defs.append('filter').attr('id', (d) => {
      if (d.activityType === 'Breakdown') {
        return 'dropshadow';
      }
    });
    filter.append('feGaussianBlur')
      .attr('in', 'SourceGraphic')
      .attr('stdDeviation', '5 0');

    const gradient = defs.append('linearGradient')
      .attr('id', (d) => {
        return d.activityType + '_' + d.id;
      })
      .attr('x1', '0')
      .attr('x2', '1')
      .attr('y1', '0')
      .attr('y2', '0');

    gradient.append('stop')
      .attr('offset', '0')
      .attr('stop-color', this.setLeftColor);

    gradient.append('stop')
      .attr('offset', '1')
      .attr('stop-color', this.setRightColor);

    // Handle objects that are no longer in the collection
    timeBlocks.exit().remove();

    blocksEnter.append('rect')
      .attr('x', 0)
      .attr('width', '100%')
      .attr('y', this.position)
      .attr('height', this.blockHeightMap)
      .attr('class',  (d) => {
        // return cssClassMap(d);
        return d.activityType.toLowerCase() + ' ' + d.state.toLowerCase() + ' ' + this.warningMap(d.warnings) + ' ' + d.id;
      })
      .style('filter', (d) => {
        if (d.activityType === 'Breakdown') {
          return 'url(#dropshadow)';
        }
      })
      .style('fill', (d) => {
        if (d.activityType === 'Production' || d.activityType === 'MachineConfig') {
          return 'url(#' + d.activityType + '_' + d.id + ')';
        }
      });

      // Appending line to remove vertical green lines for back to back Unscheduled blocks

      // Right Line
    blocksEnter.append('line')
      .style('stroke', (d) => {
        if (d.activityType === 'Unscheduled' && d.showRightLine) {
          return '#8FAE17';
        }
      })
      .style('stroke-width', '2px')
      .style('opacity', '0.7')
      .attr('x1', '100%')
      .attr('y1', '0')
      .attr('x2', '100%')
      .attr('y2', '46%');

    // Left Line
    blocksEnter.append('line')
      .style('stroke', (d) => {
        if (d.activityType === 'Unscheduled' && d.showLeftLine) {
          return '#8FAE17';
        }
      })
      .style('stroke-width', '2px')
      .style('opacity', '0.7')
      .attr('x1', '0')
      .attr('y1', '0')
      .attr('x2', '0')
      .attr('y2', '46%');

    // Bottom Line
    blocksEnter.append('line')
      .style('stroke', (d) => {
        if (d.activityType === 'Unscheduled') {
          return '#8FAE17';
        }
      })
      .style('opacity', '0.7')
      .attr('y1', '46%')
      .attr('x2', '100%')
      .attr('y2', '46%');

    // Appending Text
    const texts = blocksEnter.append('text')
      .attr('y', this.textPosition)
      .attr('x', 5)
      .attr('dominant-baseline', 'text-before-edge');

    texts.append('tspan')
    .style('font-size', '14px')
    .style('fill', '#4b5a47')
    .style('font-weight', '600')
    .style('cursor', 'default')
    .text((d) => {
      if (d.activityType === 'Production') {
        return d.orderCode;
      }
    });
    texts.append('tspan')
    .attr('y', this.tspanPosition)
    .style('font-size', '11px')
    .style('fill', '#4b5a47')
    .style('cursor', 'default')
    .text((d) => {
      if (d.activityType === 'Production') {
        return (d.customerName) ? ' -' + d.customerName : '';
      }
    });
    texts.append('tspan')
    .attr('y', this.tspanPosition)
    .style('font-size', '11px')
    .style('fill', '#8e5715')
    .style('cursor', 'default')
    .text((d) => {
      if (d.activityType === 'MachineConfig') {
        return 'MATERIAL:';
      }
    });
    texts.append('tspan')
      .attr('y', this.textPosition)
      .style('font-size', '14px')
      .style('fill', '#8e5715')
      .style('font-weight', '600')
      .style('cursor', 'default')
      .text((d) => {
        if (d.activityType === 'MachineConfig') {
          return d.materialCode;
        }
      });
    texts.append('tspan')
      .attr('y', this.tspanPosition)
      .style('font-size', '11px')
      .style('fill', '#8e5715')
      .style('cursor', 'default')
      .text((d) => {
        if (d.activityType === 'MachineConfig') {
          return ' TOOLING:';
        }
      });
    texts.append('tspan')
      .attr('y', this.textPosition)
      .style('font-size', '14px')
      .style('fill', '#8e5715')
      .style('font-weight', '600')
      .style('cursor', 'default')
      .text((d) => {
        if (d.activityType === 'MachineConfig') {
          return d.toolingCode;
        }
      });
  }

  update(newScale) {
    const timeBlocks = this.gMain.selectAll('svg');
    // Update existing objects
    timeBlocks
      .attr('x', (d) => {
        return newScale(new Date(d.startDateTime));
      })
      .attr('width', (d) => newScale(new Date(d.endDateTime)) - newScale(new Date(d.startDateTime)))
      .classed('muted', (d) => {
        const keysOfPrntObj =  Object.keys(d);
        let searchString = '';
        for (let i = 0; i < keysOfPrntObj.length; i ++) {
          if (d[keysOfPrntObj[i]] && keysOfPrntObj[i] !== 'remainingFt' &&  keysOfPrntObj[i] !== 'totalFt') {
            searchString += d[keysOfPrntObj[i]];
          }
        }
        return (this.searchText && searchString && !searchString.toLowerCase().includes(this.searchText.toLowerCase()));
      });
  }
}
