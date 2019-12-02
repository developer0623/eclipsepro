import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from 'app/shared/material-components.module';
import { PipesModule } from 'app/pipes/pipes.module';
import { ProductionSummaryRoutingModule } from './production-summary-routing.module';
import { SummaryPipesModule } from './summary-pipes/summary-pipes.module';
import { ProductionSummaryComponent } from './production-summary.component';
import { SummaryTooltipDirective } from './directives/summary-tooltip.directive';
import { MachineSummaryComponent } from './components/machine-summary/machine-summary.component';
import { SummaryStateComponent } from './components/summary-state/summary-state.component';
import { SummaryTimebarComponent } from './components/summary-timebar/summary-timebar.component';
import { SummaryHistoryComponent } from './components/summary-history/summary-history.component';
import { CustomDateModalComponent } from './components/custom-date-modal/custom-date-modal.component';
import { PrintPreviewDialogComponent } from './components/print-preview-dialog/print-preview-dialog.component';
import { PrintMachineSummaryComponent } from './components/print-machine-summary/print-machine-summary.component';
import { PrintSummaryStateComponent } from './components/print-summary-state/print-summary-state.component';
import { PrintSummaryTimebarComponent } from './components/print-summary-timebar/print-summary-timebar.component';
import { ReportGraphDialogComponent } from './components/report-graph-dialog/report-graph-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    ProductionSummaryRoutingModule,
    SummaryPipesModule
  ],
  declarations: [
    ProductionSummaryComponent,
    SummaryTooltipDirective,
    MachineSummaryComponent,
    SummaryStateComponent,
    SummaryTimebarComponent,
    SummaryHistoryComponent,
    CustomDateModalComponent,
    PrintPreviewDialogComponent,
    PrintMachineSummaryComponent,
    PrintSummaryStateComponent,
    PrintSummaryTimebarComponent,
    ReportGraphDialogComponent
  ],
  entryComponents: [
    CustomDateModalComponent,
    PrintPreviewDialogComponent,
    ReportGraphDialogComponent
  ]
})
export class ProductionSummaryModule { }
