import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import { PipesModule } from 'app/pipes/pipes.module';
import { DowntimeExplorerRoutingModule } from './downtime-explorer-routing.module';
import { DowntimeExplorerComponent } from './downtime-explorer.component';
import { DcParetoChartModule } from 'app/components/dc-pareto-chart/dc-pareto-chart.module';
import { TimebarChartModule } from 'app/components/timebar-chart/timebar-chart.module';
import { DcTimebarChartModule } from 'app/components/dc-timebar-chart/dc-timebar-chart.module';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    DowntimeExplorerRoutingModule,
    DcParetoChartModule,
    TimebarChartModule,
    DcTimebarChartModule
  ],
  declarations: [DowntimeExplorerComponent]
})
export class DowntimeExplorerModule { }
