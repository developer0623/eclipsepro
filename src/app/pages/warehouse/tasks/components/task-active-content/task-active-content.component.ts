import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-task-active-content',
  templateUrl: './task-active-content.component.html',
  styleUrls: ['./task-active-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskActiveContentComponent implements OnInit {
  @Input('task') task = {};

  constructor() { }

  ngOnInit() {
  }

}
