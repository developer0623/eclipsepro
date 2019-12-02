import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgentStatusRoutingModule } from './agent-status-routing.module';
import { AgentStatusComponent } from './agent-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgentStatusRoutingModule
  ],
  declarations: [AgentStatusComponent]
})
export class AgentStatusModule { }
