import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AndonConfigurationRoutingModule } from './andon-configuration-routing.module';
import { AndonConfigurationComponent } from './andon-configuration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AndonConfigurationRoutingModule
  ],
  declarations: [AndonConfigurationComponent]
})
export class AndonConfigurationModule { }
