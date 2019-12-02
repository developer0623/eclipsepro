import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateRoutingModule } from './update-routing.module';
import { UpdateComponent } from './update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UpdateRoutingModule
  ],
  declarations: [UpdateComponent]
})
export class UpdateModule { }
