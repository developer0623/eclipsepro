import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-run-state',
  templateUrl: './run-state.component.html',
  styleUrls: ['./run-state.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RunStateComponent implements OnInit {
  @Input('state') state: any;
  @Input('lastRunStateChange') lastRunStateChange: any;
  @Input('isOffline') isOffline: any;
  @Input('isSchedule') isSchedule: any;

  constructor() { }

  ngOnInit() {
  }

}
