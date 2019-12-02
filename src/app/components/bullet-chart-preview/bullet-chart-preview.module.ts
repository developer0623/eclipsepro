import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulletChartPreviewComponent } from './bullet-chart-preview.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BulletChartPreviewComponent],
  exports: [BulletChartPreviewComponent]
})
export class BulletChartPreviewModule { }
