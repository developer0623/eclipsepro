import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PrintingRoutingModule } from './printing-routing.module';
import { PrintingComponent } from './printing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrintingRoutingModule
  ],
  declarations: [PrintingComponent]
})
export class PrintingModule { }
