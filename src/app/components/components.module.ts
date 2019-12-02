import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/shared/material-components.module';
import { PipesModule } from 'app/pipes/pipes.module';
import { RunStateComponent } from './run-state/run-state.component';
import { SnapshotBarComponent } from './snapshot-bar/snapshot-bar.component';
import { TimelineBlockComponent } from './timeline-block/timeline-block.component';
import { TimelineXAxisComponent } from './timeline-x-axis/timeline-x-axis.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    RunStateComponent,
    SnapshotBarComponent,
    TimelineBlockComponent,
    TimelineXAxisComponent
  ],
  exports: [
    RunStateComponent,
    SnapshotBarComponent,
    TimelineBlockComponent,
    TimelineXAxisComponent
  ]
})
export class ComponentsModule { }
