import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExperimentsRoutingModule } from './experiments-routing.module';
import { ExperimentsComponent } from './experiments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ExperimentsRoutingModule
  ],
  declarations: [ExperimentsComponent]
})
export class ExperimentsModule { }
