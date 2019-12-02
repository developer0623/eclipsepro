import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../shared/list/list.module';
import { MaterialModule } from '../../shared/material-components.module';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderDetailHeaderComponent } from './components/order-detail-header/order-detail-header.component';
import { OrderHeaderStateComponent } from './components/order-header-state/order-header-state.component';
import { OrderBundleItemComponent } from './components/order-bundle-item/order-bundle-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    OrdersRoutingModule,

    // Core
    ListModule,
    BreadcrumbsModule,
  ],
  declarations: [
    OrdersComponent,
    OrdersListComponent,
    OrderDetailComponent,
    OrderDetailHeaderComponent,
    OrderHeaderStateComponent,
    OrderBundleItemComponent
  ]
})
export class OrdersModule { }
