import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PerformanceStandardsRoutingModule } from './performance-standards-routing.module';
import { PerformanceStandardsComponent } from './performance-standards.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PerformanceStandardsRoutingModule
  ],
  declarations: [PerformanceStandardsComponent]
})
export class PerformanceStandardsModule { }
