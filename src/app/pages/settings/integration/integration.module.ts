import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IntegrationRoutingModule
  ],
  declarations: [IntegrationComponent]
})
export class IntegrationModule { }
