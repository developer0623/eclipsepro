import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-detail-header',
  templateUrl: './order-detail-header.component.html',
  styleUrls: ['./order-detail-header.component.scss']
})
export class OrderDetailHeaderComponent implements OnInit {
  @Input('orderCode') orderCode = '';
  @Input('customerName') customerName = '';
  @Input('status') status = '';
  @Input('completeNum') completeNum = 0;

  constructor() { }

  ngOnInit() {
  }

}
