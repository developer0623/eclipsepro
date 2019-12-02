import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DndModule } from 'app/directives/cdnd/dnd.module';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../shared/list/list.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { ScheduleEditorComponent } from './schedule-editor.component';
import { ScheduleDetailComponent } from './components/schedule-detail/schedule-detail.component';
import { ScheduleEditorRoutingModule } from './schedule-editor-routing.module';
import { PipesModule } from 'app/pipes/pipes.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    DndModule,
    ListModule,
    BreadcrumbsModule,
    ScheduleEditorRoutingModule,
    PipesModule,
    PerfectScrollbarModule
  ],
  declarations: [
    ScheduleEditorComponent,
    ScheduleDetailComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class ScheduleEditorModule { }
