import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StatusRoutingModule } from './status-routing.module';
import { StatusComponent } from './status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StatusRoutingModule
  ],
  declarations: [StatusComponent]
})
export class StatusModule { }
