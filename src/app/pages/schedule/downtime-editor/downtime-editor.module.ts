import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PipesModule } from 'app/pipes/pipes.module';
import { DowntimeEditorComponent } from './downtime-editor.component';
import { DowntimeEditorRoutingModule } from './downtime-editor-routing.module';
import { DowntimeDetailModalComponent } from './components/downtime-detail-modal/downtime-detail-modal.component';
import { RepeatDetailModalComponent } from './components/repeat-detail-modal/repeat-detail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    DowntimeEditorRoutingModule
  ],
  declarations: [DowntimeEditorComponent, DowntimeDetailModalComponent, RepeatDetailModalComponent],
  entryComponents: [DowntimeDetailModalComponent, RepeatDetailModalComponent]
})
export class DowntimeEditorModule { }
