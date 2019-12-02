import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-task-current-footer',
  templateUrl: './task-current-footer.component.html',
  styleUrls: ['./task-current-footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskCurrentFooterComponent implements OnInit {
  @Input('task') task = {};

  constructor() { }

  ngOnInit() {
  }

}
