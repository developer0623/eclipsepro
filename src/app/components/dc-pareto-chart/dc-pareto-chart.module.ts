import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import { DcParetoChartComponent } from './dc-pareto-chart.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [DcParetoChartComponent],
  exports: [DcParetoChartComponent]
})
export class DcParetoChartModule { }
