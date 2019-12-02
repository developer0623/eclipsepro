import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SystemPreferencesRoutingModule } from './system-preferences-routing.module';
import { SystemPreferencesComponent } from './system-preferences.component';
import { DirectivesModule } from 'app/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SystemPreferencesRoutingModule,
    DirectivesModule
  ],
  declarations: [SystemPreferencesComponent]
})
export class SystemPreferencesModule { }
