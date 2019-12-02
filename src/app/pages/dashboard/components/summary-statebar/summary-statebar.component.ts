import { Component, OnInit, Input } from '@angular/core';
import { IMetricDefinition} from 'app/models/dto';
@Component({
  selector: 'app-summary-statebar',
  templateUrl: './summary-statebar.component.html',
  styleUrls: ['./summary-statebar.component.scss']
})
export class SummaryStatebarComponent implements OnInit {
  @Input('isReverse') isReverse = true;
  @Input('metric') metric: IMetricDefinition;
  @Input('value') value;
  percent = 0;
  mainColor = ['#A7A8AB', '#BBBDBF', '#D7D8D9'];
  valueBgCol = ['#B8595E', '#47494D', '#709B79'];
  startPos = '0%';
  endPos = '0%';
  constructor() { }

  ngOnInit() {
    this.percent = 100 / (this.metric.maxValue - this.metric.minValue);
    this.startPos = this.metric.okRangeStart * this.percent + '%';
    this.endPos = (this.metric.okRangeEnd - this.metric.okRangeStart) * this.percent + '%';
  }

  getMainArea(order) {
    const mainStyle = {'background-color': ''};
    if (this.isReverse) {
      mainStyle['background-color'] = this.mainColor[2 - order];
    } else {
      mainStyle['background-color'] = this.mainColor[order];
    }

    switch (order) {
      case 0: {
        mainStyle['width'] = this.startPos;
        break;
      }
      case 1: {
        mainStyle['width'] = this.endPos;
        break;
      }
      default: {
        mainStyle['flex'] = 1;
        break;
      }
    }
    return mainStyle;
  }

  getTargetPos() {
    const pos = this.metric.targetValue * this.percent + '%';
    return { 'left': pos};

  }

  getValueState() {
    if (this.value < this.metric.okRangeStart) {
      return 0;
    }

    if (this.value < this.metric.okRangeEnd) {
      return 1;
    }

    return 2;
  }

  getValueArea() {
    let width = this.value * this.percent;
    if (width > 100) {
      width = 100;
    }
    const state = this.getValueState();
    let bgCol = '';
    if (this.isReverse) {
      bgCol = this.valueBgCol[2 - state];
    } else {
      bgCol = this.valueBgCol[state];
    }
    return { 'width': `${width}%`, 'background-color': bgCol};
  }

}
