import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'app/services/orders.service';
import {IJobSummary} from 'app/models/dto';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  orderId = '';
  order: IJobSummary;
  order$: any;

  constructor(private route: ActivatedRoute, private orderService: OrdersService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.orderId = paramMap.get('id');
      this.order$ = this.orderService.getOrderItem(this.orderId).subscribe(order => {
        this.order = order;
      });
    });
  }

  ngOnDestroy() {
    this.order$.unsubscribe();
  }

}
