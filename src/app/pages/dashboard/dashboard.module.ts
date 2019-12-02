import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsModule } from 'app/components/components.module';
import { PipesModule } from 'app/pipes/pipes.module';
import { DashboardComponent } from './dashboard.component';
import { MachineDashboardMiniComponent } from './components/machine-dashboard-mini/machine-dashboard-mini.component';
import { MachineListComponent } from './components/machine-list/machine-list.component';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';
import { DetailHeaderComponent } from './components/detail-header/detail-header.component';
import { DetailDateComponent } from './components/detail-date/detail-date.component';
import { DetailHeaderStateComponent } from './components/detail-header-state/detail-header-state.component';
import { DetailHeaderNextComponent } from './components/detail-header-next/detail-header-next.component';
import { DetailHeaderTimeComponent } from './components/detail-header-time/detail-header-time.component';
import { ParetoComponent } from './components/pareto/pareto.component';
import { MachineSummaryComponent } from './components/machine-summary/machine-summary.component';
import { SummaryStatebarComponent } from './components/summary-statebar/summary-statebar.component';
import { SummaryHistoryChartComponent } from './components/summary-history-chart/summary-history-chart.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MaterialModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent,
    MachineDashboardMiniComponent,
    MachineListComponent,
    MachineDetailComponent,
    DetailHeaderComponent,
    DetailDateComponent,
    DetailHeaderStateComponent,
    DetailHeaderNextComponent,
    DetailHeaderTimeComponent,
    ParetoComponent,
    MachineSummaryComponent,
    SummaryStatebarComponent,
    SummaryHistoryChartComponent,
  ],
  providers: []
})
export class DashboardModule {
}
