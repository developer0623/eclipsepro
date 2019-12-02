import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditableModule } from 'app/components/editable/editable.module';
import { BulletChartPreviewModule } from 'app/components/bullet-chart-preview/bullet-chart-preview.module';
import { PipesModule } from 'app/pipes/pipes.module';
import { MetricConfigurationRoutingModule } from './metric-configuration-routing.module';
import { MetricConfigurationComponent } from './metric-configuration.component';
import { ConfigTableComponent } from './config-table/config-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MetricConfigurationRoutingModule,
    EditableModule,
    PipesModule,
    BulletChartPreviewModule
  ],
  declarations: [MetricConfigurationComponent, ConfigTableComponent]
})
export class MetricConfigurationModule { }
