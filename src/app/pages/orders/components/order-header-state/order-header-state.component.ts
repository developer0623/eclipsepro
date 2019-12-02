import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-header-state',
  templateUrl: './order-header-state.component.html',
  styleUrls: ['./order-header-state.component.scss']
})
export class OrderHeaderStateComponent implements OnInit {
  value = 42;

  constructor() { }

  ngOnInit() {
  }

}
