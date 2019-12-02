import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import { ComponentsModule } from 'app/components/components.module';
import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    TimelineRoutingModule
  ],
  declarations: [TimelineComponent]
})
export class TimelineModule { }
