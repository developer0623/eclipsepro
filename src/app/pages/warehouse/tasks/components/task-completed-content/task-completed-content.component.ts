import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-task-completed-content',
  templateUrl: './task-completed-content.component.html',
  styleUrls: ['./task-completed-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskCompletedContentComponent implements OnInit {
  @Input('task') task = {};
  constructor() { }

  ngOnInit() {
  }

}
