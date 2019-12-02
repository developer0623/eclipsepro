import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LicensingRoutingModule } from './licensing-routing.module';
import { LicensingComponent } from './licensing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LicensingRoutingModule
  ],
  declarations: [LicensingComponent]
})
export class LicensingModule { }
