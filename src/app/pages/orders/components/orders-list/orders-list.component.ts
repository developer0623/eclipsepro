import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, ReplaySubject } from 'rxjs';
import { OrdersService } from 'app/services/orders.service';
import { IJobSummary } from 'app/models/dto';
import { Router } from '@angular/router';
export interface OrderHeaderEl {
  name: string;
  property: string;
  placeholder: string;
}


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, AfterViewInit, OnDestroy {
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  orders: IJobSummary[];
  orders$: any;
  visibleColumns = ['orderCode', 'materialCode', 'toolingCode', 'totalFt', 'remainingFt', 'status', 'machineNumber',
  'sequence', 'customerName', 'requiredDate', 'completeDate', 'estimatedCompleteTime', 'importDate'
  ];

  columns: OrderHeaderEl[] = [
    { property: 'orderCode', name: 'Order Number', placeholder: 'Order' },
    { property: 'materialCode', name: 'Material', placeholder: 'Material' },
    { property: 'toolingCode', name: 'Tooling', placeholder: 'Tooling' },
    { property: 'totalFt', name: 'Total (Ft)', placeholder: 'Total' },
    { property: 'remainingFt', name: 'Remaining (Ft)', placeholder: 'Remaining' },
    { property: 'status', name: 'Status', placeholder: 'Status'},
    { property: 'machineNumber', name: 'Machine', placeholder: 'Machine' },
    { property: 'sequence', name: 'Sequence', placeholder: 'Sequence' },
    { property: 'customerName', name: 'Customer', placeholder: 'Customer' },
    { property: 'requiredDate', name: 'Required', placeholder: 'Required' },
    { property: 'completeDate', name: 'Completed', placeholder: 'Completed' },
    { property: 'estimatedCompleteTime', name: 'Estimated', placeholder: 'Estimated' },
    { property: 'importDate', name: 'Imported', placeholder: 'Imported' }
  ];
  pageSize = 10;
  dataSource: MatTableDataSource<IJobSummary> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.orders$ = this.ordersService.orders$.subscribe(orders => {
      this.orders = orders;
      this.dataSource.data = orders;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.orders$.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  gotoDetail(row) {
    this.router.navigate(['../orders', row.ordId]);
  }

  myTrackById(index, item) {
    return item.id;
  }

}
