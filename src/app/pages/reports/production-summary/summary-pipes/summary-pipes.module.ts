import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryDateFilterPipe } from './summary-date-filter.pipe';
import { TimebarPercentPipe } from './timebar-percent.pipe';
import { PrintDateFilterPipe } from './print-date-filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SummaryDateFilterPipe,
    TimebarPercentPipe,
    PrintDateFilterPipe
  ],
  exports: [
    SummaryDateFilterPipe,
    TimebarPercentPipe,
    PrintDateFilterPipe
  ]
})
export class SummaryPipesModule { }
