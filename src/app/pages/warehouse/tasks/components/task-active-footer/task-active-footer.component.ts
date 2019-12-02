import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-task-active-footer',
  templateUrl: './task-active-footer.component.html',
  styleUrls: ['./task-active-footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskActiveFooterComponent implements OnInit {
  @Input('task') task = {};
  @Input('state') state = 0;

  constructor() { }

  ngOnInit() {
  }

}
