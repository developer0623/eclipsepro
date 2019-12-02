import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import { PipesModule } from 'app/pipes/pipes.module';
import { ProductionExplorerRoutingModule } from './production-explorer-routing.module';
import { DcParetoChartModule } from 'app/components/dc-pareto-chart/dc-pareto-chart.module';
import { TimebarChartModule } from 'app/components/timebar-chart/timebar-chart.module';
import { DcTimebarChartModule } from 'app/components/dc-timebar-chart/dc-timebar-chart.module';

import { ProductionExplorerComponent } from './production-explorer.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    ProductionExplorerRoutingModule,
    DcParetoChartModule,
    TimebarChartModule,
    DcTimebarChartModule
  ],
  declarations: [ProductionExplorerComponent]
})
export class ProductionExplorerModule { }
