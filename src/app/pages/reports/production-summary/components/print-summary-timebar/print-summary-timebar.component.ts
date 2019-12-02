import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-print-summary-timebar',
  templateUrl: './print-summary-timebar.component.html',
  styleUrls: ['./print-summary-timebar.component.scss']
})
export class PrintSummaryTimebarComponent implements OnInit {
  @Input('data') data;
  @Input('state') state = false;
  @Input('machine') machine = '';
  mainColor = ['#303030', '#666666', '#a63337', '#878787', '#c4c4c4', '#dcddde'];

  constructor() { }

  ngOnInit() {
    console.log('datttt', this.data);
  }

  getMainArea(order) {
    const mainStyle = {'background-color': '', width: ''};
    switch (order) {
      case 0: {
        mainStyle['width'] = this.data.running * 100 + '%';
        break;
      }
      case 1: {
        mainStyle['width'] = this.data.changeover * 100 + '%';
        break;
      }
      case 2: {
        mainStyle['width'] = this.data.breakdown * 100 + '%';
        break;
      }
      case 3: {
        mainStyle['width'] = this.data.otherDowntime * 100 + '%';
        break;
      }
      case 4: {
        mainStyle['width'] = this.data.exempt * 100 + '%';
        break;
      }
      case 5: {
        mainStyle['width'] = this.data.unscheduled * 100 + '%';
        break;
      }
    }

    return {
      ...mainStyle,
      'background-color': this.mainColor[order]
    };
  }

  getBottomWidth()  {
    const width = 100 - this.data.unscheduled * 100 + '%';
    return {'width' : width};
  }

}
