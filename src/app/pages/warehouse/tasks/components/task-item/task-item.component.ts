import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TaskItemComponent implements OnInit {
  @Input('task') task = {};
  @Input('state') state = 0;

  constructor() { }

  ngOnInit() {
  }

}
