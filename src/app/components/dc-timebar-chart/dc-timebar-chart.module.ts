import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcTimebarChartComponent } from './dc-timebar-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DcTimebarChartComponent],
  exports: [DcTimebarChartComponent]
})
export class DcTimebarChartModule { }
