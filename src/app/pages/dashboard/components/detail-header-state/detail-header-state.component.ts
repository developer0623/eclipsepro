import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-header-state',
  templateUrl: './detail-header-state.component.html',
  styleUrls: ['./detail-header-state.component.scss']
})
export class DetailHeaderStateComponent implements OnInit {
  @Input('state') state;
  @Input('lastRunStateChange') lastRunStateChange;
  bgColors = {H: '#f44336', R: '#4caf50'};
  constructor() { }

  ngOnInit() {
  }

  getBgColor() {
    return {
      backgroundColor: this.bgColors[this.state]
    };
  }

}
