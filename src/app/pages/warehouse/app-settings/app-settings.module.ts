import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from 'app/shared/material-components.module';
import { AppSettingsRoutingModule } from './app-settings-routing.module';
import { AppSettingsComponent } from './app-settings.component';
import { AddReasonModalComponent } from './components/add-reason-modal/add-reason-modal.component';
import { AddLocationModalComponent } from './components/add-location-modal/add-location-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppSettingsRoutingModule
  ],
  declarations: [AppSettingsComponent, AddReasonModalComponent, AddLocationModalComponent],
  entryComponents: [AddReasonModalComponent, AddLocationModalComponent]
})
export class AppSettingsModule { }
