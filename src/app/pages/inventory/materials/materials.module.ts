import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'app/pipes/pipes.module';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../shared/list/list.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsComponent } from './materials.component';
import { MaterialsListComponent } from './components/materials-list/materials-list.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { MaterialDetailHeaderComponent } from './components/material-detail-header/material-detail-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MaterialsRoutingModule,
    ListModule,
    BreadcrumbsModule,
    PipesModule
  ],
  declarations: [
    MaterialsComponent,
    MaterialsListComponent,
    MaterialDetailComponent,
    MaterialDetailHeaderComponent
  ]
})
export class MaterialsModule { }
