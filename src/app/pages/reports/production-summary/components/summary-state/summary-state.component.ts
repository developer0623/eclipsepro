import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary-state',
  templateUrl: './summary-state.component.html',
  styleUrls: ['./summary-state.component.scss']
})
export class SummaryStateComponent implements OnInit {
  @Input('isReverse') isReverse = false;
  @Input('data') data;
  percent = 0;
  mainColor = ['#A7A8AB', '#BBBDBF', '#D7D8D9'];
  valueBgCol = ['#B8595E', '#47494D', '#709B79'];
  startPos = '0%';
  endPos = '0%';

  constructor() { }

  ngOnInit() {
    this.percent = 100 / (this.data.maxValue - this.data.minValue);
    this.startPos = this.data.okRangeStart * this.percent + '%';
    this.endPos = (this.data.okRangeEnd - this.data.okRangeStart) * this.percent + '%';
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
    const pos = this.data.targetValue * this.percent + '%';
    return { 'left': pos};

  }

  getValueState() {
    if (this.data.value < this.data.okRangeStart) {
      return 0;
    }

    if (this.data.value < this.data.okRangeEnd) {
      return 1;
    }

    return 2;
  }

  getValueArea() {
    let width = this.data.value * this.percent;
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
