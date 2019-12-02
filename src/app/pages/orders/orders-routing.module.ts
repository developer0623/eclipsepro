import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: OrdersListComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: OrderDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
