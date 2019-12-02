import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'app/pipes/pipes.module';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../shared/list/list.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { CoilsRoutingModule } from './coils-routing.module';
import { CoilsComponent } from './coils.component';
import { CoilsListComponent } from './components/coils-list/coils-list.component';
import { CoilDetailComponent } from './components/coil-detail/coil-detail.component';
import { CoilDetailHeaderComponent } from './components/coil-detail-header/coil-detail-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CoilsRoutingModule,
    ListModule,
    BreadcrumbsModule,
    PipesModule
  ],
  declarations: [
    CoilsComponent,
    CoilsListComponent,
    CoilDetailComponent,
    CoilDetailHeaderComponent
  ]
})
export class CoilsModule { }
