import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimebarChartComponent } from './timebar-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimebarChartComponent],
  exports: [TimebarChartComponent]
})
export class TimebarChartModule { }
